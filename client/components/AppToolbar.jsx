import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useLocation } from 'react-router-dom';
import Drawer from './Drawer';
import FormPostitDialog from './FormPostitDialog';

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

const mapStateToProps = (state) => ({
  boards: state.boards,
});

function AppToolbar(props) {
  const classes = useStyles();
  const { boards } = props;
  const [state, setState] = useState(false);
  const [postitFormState, setPostitFormState] = useState(false);
  const location = useLocation();
  const handleOnClickMenu = () => {
    setState(true);
  };
  const handleOnClose = () => {
    setState(false);
  };

  const handleClickOpen = () => {
    setPostitFormState(true);
  };

  const handleFormClose = () => {
    setPostitFormState(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {console.log(location.pathname)}
          <IconButton onClick={handleOnClickMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer state={state} onDrawerClose={handleOnClose} boards={boards} />
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Fab onClick={handleClickOpen} color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
          <FormPostitDialog open={postitFormState} onFormClose={handleFormClose} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppToolbar.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(AppToolbar);
