import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function Board(props) {
  const classes = useStyles();
  const { board, index } = props;
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
            {board}
            {index}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default Board;
