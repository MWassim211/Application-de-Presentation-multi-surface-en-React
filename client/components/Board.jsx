/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Postit from './postiti';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {deletePostit} from '../actions/index'

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
}));


const mapStateToProps = (state) => {
  return {
    boards : state.boards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePositit : (idBoard,title) => dispatch(deletePostit({id:idBoard,title:title}))
  }
}


function Board(props) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const { boards} = props;
  const { id } = props.match.params;
  const handleDeleteClick = (id,title) => {
    props.deletePositit(id,title)
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        {console.log(id)}
        {console.log(boards)}
        {boards[id-1].postits.map((element) => (
          <Grid item lg="auto" xs={3} key={element.title}>
            <Postit param={element} />
            <Button variant="contained" onClick={()=>handleDeleteClick(element.board,element.title)}>Delete Postit</Button>
          </Grid>
        ))}
        ;
      </Grid>
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

export default connect(mapStateToProps,mapDispatchToProps)(Board);
