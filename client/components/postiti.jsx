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

function postit(props) {
  const classes = useStyles();
  const { param } = props;
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {param.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {param.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

postit.propTypes = {
  param: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default postit;
