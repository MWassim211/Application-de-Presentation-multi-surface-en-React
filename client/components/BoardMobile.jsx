import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import {
  deleteBoard, deletePostit, createPostit, setIndex, nextPostit, previousPostit,
} from '../actions/index';
import Postit from './postiti';
import FormPostitDialog from './FormPostitDialog';
import MobileToolbar from './MobileToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '2%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    paddingLeft: '5%',
    paddingRight: '5%',

  },
  addCard: {
    height: 150,
  },
}));

const mapStateToProps = (state) => ({
  boards: state.boards,
  index: state.index,
  currentPostit: state.currentPostit,
});

const mapDispatchToProps = (dispatch) => ({
  deletePositit: (idBoard, title, flag) => dispatch(deletePostit({ id: idBoard, title },
    { propagate: flag })),
  createPostit: (desc, title, idBoard, flag) => dispatch(createPostit({ desc, title, idBoard },
    { propagate: flag })),
  deleteBoard: (idBoard, flag) => dispatch(deleteBoard({ id: idBoard }, { propagate: flag })),
  setIndex: (index, flag) => dispatch(setIndex({ index }, { propagate: flag })),
  nextPostit: (id, idPostit, flag) => dispatch(nextPostit({ id, idPostit }, { propagate: flag })),
  prevPostit: (id, idPostit, flag) => dispatch(previousPostit({ id, idPostit },
    { propagate: flag })),
});

function BoardMobile(props) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const {
    boards, index, onBoardChange, currentPostit,
  } = props;
  // const { id } = props.match.params;
  const { id, idPostit } = useParams();
  useEffect(() => {
    const elem = boards.findIndex((e) => e.id === id);
    if (elem === -1) {
      props.history.push(`/${index}`);
    } else {
      props.setIndex(id, true);
      onBoardChange(boards[elem].title);
    }
  }, [id]);

  useEffect(() => {
    props.history.push(`/${id}/postit/${currentPostit}`);
  }, [currentPostit]);

  const [postitFormState, setPostitFormState] = useState(false);
  const [postitTitle, setpostitTitle] = useState('');
  const [postitDesc, setpostitDesc] = useState('');
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState('#fff');
  const location = useLocation();

  const handleClickOpen = () => {
    setPostitFormState(true);
  };

  const handlePdescOnchange = (e) => {
    setpostitDesc(e.target.value);
  };

  const handlePTitleOnChange = (e) => {
    setpostitTitle(e.target.value);
  };

  const handleColorOnChange = (e) => {
    setColor(e.target.value);
  };

  const handleVosibleOnChange = (e) => {
    setVisible(e.target.value);
  };

  const handlePostitFormSubmit = () => {
    setPostitFormState(false);
    const uri = location.pathname;
    console.log(uri.slice(1));
    props.createPostit(postitDesc, postitTitle, parseInt(uri.slice(1), 10), true);
    setpostitDesc('');
    setpostitTitle('');
    setVisible('');
    setColor('');
  };

  const handleDeleteClick = (idB, title) => {
    props.deletePositit(idB, title, true);
  };

  const handleDeleteBoardClick = (idB) => {
    props.deleteBoard(idB, true);
    // props.history.push('/');
  };

  const handlePostitNext = (idB, idPostitn) => {
    props.nextPostit(idB, idPostitn, false);
  };

  const handlePostitPrevious = (idB, idPostitp) => {
    props.prevPostit(idB, idPostitp, false);
  };
  const GetIndexElem = () => {
    if (boards.findIndex((e) => e.id === id) === -1) {
      return 0;
    }
    return boards.findIndex((e) => e.id === id);
  };

  return (
    <div className={classes.root}>
      {GetIndexElem() !== -1 ? (
        <Grid className={classes.grid} container spacing={3} justify="flex-start">
          {boards[GetIndexElem()].postits[parseInt(idPostit, 10) - 1]
            ? (
              <Grid
                item
                lg={3}
                xs={12}
                md={4}
                key={boards[GetIndexElem()].postits[parseInt(idPostit, 10) - 1].title}
              >
                <Postit
                  param={boards[GetIndexElem()].postits[parseInt(idPostit, 10) - 1]}
                  indexPostit={parseInt(idPostit, 10) - 1}
                  handleOnDelete={handleDeleteClick}
                />
              </Grid>
            )
            : (
              <Grid item lg={3} xs={12} md={4}>
                <Card className={classes.addCard}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{ justifyContent: 'center' }}>
                      Add new postit
                    </Typography>

                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Fab className={classes.addPositiBtn} onClick={handleClickOpen} color="secondary" aria-label="add">
                      <AddIcon />
                    </Fab>
                  </CardActions>
                </Card>
              </Grid>
            )}
          {boards[GetIndexElem()].postits[parseInt(idPostit, 10) - 1] && (
          <Grid item lg={3} xs={12} md={4}>
            <Card className={classes.addCard}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{ justifyContent: 'center' }}>
                  Add new postit
                </Typography>

              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Fab className={classes.addPositiBtn} onClick={handleClickOpen} color="secondary" aria-label="add">
                  <AddIcon />
                </Fab>
              </CardActions>
            </Card>
          </Grid>
          )}
        </Grid>
      )
        : <h2>hello world</h2>}
      <MobileToolbar postitNext={handlePostitNext} postitPrevious={handlePostitPrevious} />
      <FormPostitDialog
        open={postitFormState}
        action="Create Postit"
        onPostitFormClose={handlePostitFormSubmit}
        postitDesc={postitDesc}
        postitTitle={postitTitle}
        postitVisible={visible}
        postitColor={color}
        handlePdescOnchange={handlePdescOnchange}
        handlePTitleOnChange={handlePTitleOnChange}
        handleColorOnChange={handleColorOnChange}
        handleVisibleOnChange={handleVosibleOnChange}
      />
      <Button variant="contained" onClick={() => handleDeleteBoardClick(id)}>Delete Board</Button>
    </div>
  );
}

BoardMobile.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number,
  onBoardChange: PropTypes.func.isRequired,
  currentPostit: PropTypes.string.isRequired,
  setIndex: PropTypes.func.isRequired,
  createPostit: PropTypes.func.isRequired,
  deletePositit: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  nextPostit: PropTypes.func.isRequired,
  prevPostit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

BoardMobile.defaultProps = {
  index: 0,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardMobile));
