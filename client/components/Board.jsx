/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Postit from './postiti';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {deleteBoard, deletePostit, createPostit} from '../actions/index'
import {useParams, withRouter,useLocation} from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FormPostitDialog from './FormPostitDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding : '2%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid : {
    paddingLeft: '5%',
    paddingRight: '5%',
    
  },
  addCard : {
    height : 150,
  },
}));


const mapStateToProps = (state) => {
  return {
    boards : state.boards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePositit : (idBoard,title) => dispatch(deletePostit({id:idBoard,title:title})),
    createPostit: (desc, title, idBoard) => dispatch(createPostit({ desc, title, idBoard })),
    deleteBoard : (idBoard) => dispatch(deleteBoard({id:idBoard}))
  }
}


function Board(props) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const { boards} = props;
  // const { id } = props.match.params;
  const { id } = useParams()
  const [postitFormState, setPostitFormState] = useState(false);
  const [postitTitle, setpostitTitle] = useState('');
  const [postitDesc, setpostitDesc] = useState('');
  const [visible, setVisible] = useState(true);
  const [color,setColor] = useState("#fff");
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
  }

  const handleVosibleOnChange = (e) => {
    setVisible(e.target.value);
  }

  const handlePostitFormSubmit = () => {
    setPostitFormState(false);
    const uri = location.pathname;
    console.log(uri.slice(1));
    props.createPostit(postitDesc, postitTitle, parseInt(uri.slice(1)));
    setpostitDesc('');
    setpostitTitle('');
    setVisible('');
    setColor('');
  }

  const handleDeleteClick = (id,title) => {
    props.deletePositit(id,title);
  }

  const handleDeleteBoardClick= (id)=>{
    props.deleteBoard(id);
    props.history.push('/');
  }

  const GetIndexElem = () => {
    return boards.findIndex((e)=> e.id == id);
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container  spacing={3} justify="flex-start">
        {console.log(GetIndexElem()),
        boards[GetIndexElem()].postits.map((element) => (
          <Grid item lg={3} xs={12} md={4} key={element.title}>
            <Postit param={element} handleOnDelete={handleDeleteClick}/>
          </Grid>
        ))}
        <Grid item lg={3} xs={12} md={4} >
          <Card className={classes.addCard}>
            <CardContent >
              <Typography gutterBottom variant="h5" component="h2" style={{justifyContent: 'center'}}>
                Add new postit
              </Typography>
              
            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
              <Fab className={classes.addPositiBtn} onClick={handleClickOpen} color="secondary" aria-label="add">
                <AddIcon />
              </Fab>
              </CardActions>
          </Card>
          </Grid>
      </Grid>
          <FormPostitDialog
            open={postitFormState}
            action='Create Postit'
            onPostitFormClose={handlePostitFormSubmit}
            postitDesc={postitDesc}
            postitTitle={postitTitle}
            postitVisible={visible}
            postitColor={color}
            handlePdescOnchange={handlePdescOnchange}
            handlePTitleOnChange={handlePTitleOnChange}
            handleColorOnChange={handleColorOnChange}
            handleVisibleOnChange={handleVosibleOnChange}
          ></FormPostitDialog>
      <Button variant="contained" onClick={()=>handleDeleteBoardClick(id)}>Delete Board</Button>
    </div>
  );
}

Board.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number,
};

Board.defaultProps = {
  index: 0,
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Board));
