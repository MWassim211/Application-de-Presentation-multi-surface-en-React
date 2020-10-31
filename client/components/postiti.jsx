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

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  fullHeightCard: {
    height: '100%',
  },
});

function postit(props) {
  const classes = useStyles();
  const { param } = props;
  return (
    <div>
      <Card className={classes.fullHeightCard}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {param.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {param.text}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <EditIcon style={{ color: green[500] }} />
          <DeleteIcon color="secondary" style={{ marginLeft: 'auto' }} />
        </CardActions>
      </Card>
    </div>
  );
}

postit.propTypes = {
  param: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default postit;
