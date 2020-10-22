/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Postit from './postiti';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Board(props) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const { boards, index } = props;
  const { id } = props.match.params;
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        {console.log(id)}
        {console.log(boards)}
        {boards[id-1].postits.map((element) => (
          <Grid item lg="auto" xs={3} key={element.title}>
            <Postit param={element} />
          </Grid>
        ))}
        ;
      </Grid>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number,
};

Board.defaultProps = {
  index: 0,
};

export default Board;
