import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppToolbar(props) {
  const classes = useStyles();
  const { boards } = props;
  const [state, setState] = useState(false);
  const handleOnClickMenu = () => {
    setState(true);
    console.log('set to opened');
  };
  const handleOnClose = () => {
    setState(false);
    console.log('set to closed');
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleOnClickMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer state={state} onDrawerClose={handleOnClose} boards={boards} />
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppToolbar.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppToolbar;
