/* eslint-disable  */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height : 150,

  },
  fullHeightCard: {
    height: '100%',
  },
  deleteBtn: {
    marginLeft: 'auto',
    color: 'secondary',
  },
  editBtn: {
    color: green[500],
  },
});

function postit(props) {
  const classes = useStyles();
  const { param, handleOnDelete } = props;
  return (
    <div>
      <Card >
        <CardContent className={classes.root}>
          <Typography gutterBottom variant="h5" component="h2">
            {param.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {param.text}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton edge="start" className={classes.editBtn}>
            <EditIcon />
          </IconButton>
          <IconButton edge="start" style={{marginLeft: 'auto'}} color= 'secondary' onClick={()=>handleOnDelete(param.board, param.title)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

postit.propTypes = {
  param: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleOnDelete: PropTypes.func.isRequired,
};

export default postit;
