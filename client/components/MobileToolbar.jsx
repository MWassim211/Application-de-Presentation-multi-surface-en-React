import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

function MobileToolbar(props) {
  const classes = useStyles();
  const { id, idPostit } = useParams();
  const { postitNext, postitPrevious } = props;
  return (
    <div>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => postitPrevious(id, idPostit)}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => postitNext(id, idPostit)}>
            <SkipNextIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

MobileToolbar.propTypes = {
  postitNext: PropTypes.func.isRequired,
  postitPrevious: PropTypes.func.isRequired,
};

export default MobileToolbar;
