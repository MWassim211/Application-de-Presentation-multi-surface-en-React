import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import {
  deletePostit, createPostit, setIndex,
} from '../actions/index';
import Postit from './postiti';
import FormPostitDialog from './FormPostitDialog';

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
  deleteButton: {
    marginBottom: 100,
  },
  addCard: {
    height: 150,
  },
}));

const mapStateToProps = (state) => ({
  boards: state.boards,
  index: state.index,
});

const mapDispatchToProps = (dispatch) => ({
  deletePositit: (idBoard, title, flag) => dispatch(deletePostit({ id: idBoard, title },
    { propagate: flag })),
  createPostit: (desc, title, idBoard, flag) => dispatch(createPostit({ desc, title, idBoard },
    { propagate: flag })),
  setIndex: (index, flag) => dispatch(setIndex({ index }, { propagate: flag })),
});

function Board(props) {
  const classes = useStyles();
  const { boards, index } = props;
  const { id } = useParams();
  useEffect(() => {
    const elem = boards.findIndex((e) => e.id === id);
    if (elem === -1) {
      props.history.push(`/${index}`);
    } else {
      props.setIndex(id, true);
    }
  }, [id]);

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

  const handleNoAction = () => {
    setPostitFormState(false);
  };

  const handlePostitFormSubmit = () => {
    setPostitFormState(false);
    const uri = location.pathname;
    props.createPostit(postitDesc, postitTitle, parseInt(uri.slice(1), 10), true);
    setpostitDesc('');
    setpostitTitle('');
    setVisible('');
    setColor('');
  };

  const handleDeleteClick = (idp, title) => {
    props.deletePositit(idp, title, true);
  };

  const GetIndexElem = () => {
    if (boards.findIndex((e) => e.id === id) === -1 || boards.length === 0) {
      return -1;
    }
    return boards.findIndex((e) => e.id === id);
  };

  return (
    <div className={classes.root}>
      {GetIndexElem() !== -1 ? (
        <Grid className={classes.grid} container spacing={3} justify="flex-start">
          {
          boards[GetIndexElem()].postits.map((element, i) => (
            <Grid item lg={3} xs={12} md={4} key={element.title}>
              <Postit param={element} indexPostit={i} handleOnDelete={handleDeleteClick} />
            </Grid>
          ))
}
          <Grid item lg={3} xs={12} md={4}>
            <Card className={classes.addCard} style={{ backgroundColor: 'lightgray' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{ justifyContent: 'center' }}>
                  <div>Add new postit</div>
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Fab className={classes.addPositiBtn} onClick={handleClickOpen} color="secondary" aria-label="add">
                  <AddIcon />
                </Fab>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )
        : <div style={{ justifyContent: 'center' }}><h2>Aucun board trouvé,pour en créer un,cliquez sur le button plus en haut à droite</h2></div>}
      <FormPostitDialog
        open={postitFormState}
        action="Create Postit"
        onPostitFormClose={handlePostitFormSubmit}
        onCloseNoAction={handleNoAction}
        postitDesc={postitDesc}
        postitTitle={postitTitle}
        postitVisible={visible}
        postitColor={color}
        handlePdescOnchange={handlePdescOnchange}
        handlePTitleOnChange={handlePTitleOnChange}
        handleColorOnChange={handleColorOnChange}
        handleVisibleOnChange={handleVosibleOnChange}
      />
    </div>
  );
}

Board.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number,
  setIndex: PropTypes.func.isRequired,
  createPostit: PropTypes.func.isRequired,
  deletePositit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Board.defaultProps = {
  index: 0,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
