/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Drawer from './Drawer';
import FormPostitDialog from './FormPostitDialog';
import {
  createPostit, createBoard, previousBoard, nextBoard,
} from '../actions/index';

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

const mapDispatchToProps = (dispatch) => ({
  createBoard: (name, title) => dispatch(createBoard({ name, title })),
  createPostit: (desc, title, idBoard) => dispatch(createPostit({ desc, title, idBoard })),
  nextBoard: () => dispatch(nextBoard({})),
});

function AppToolbar(props) {
  const classes = useStyles();
  const { boards } = props;
  const [state, setState] = useState(false);
  const [postitFormState, setPostitFormState] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardsTitle, setboardsTitle] = useState('');
  const [postitDesc, setpostitDesc] = useState('');
  const [postitTitle, setpostitTitle] = useState('');
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
    if (location.pathname === '/') {
      props.createBoard(boardName, boardsTitle);
    } else {
      // eslint-disable-next-line radix
      props.createPostit(postitDesc, postitTitle, parseInt(location.pathname.charAt(1)));
    }
  };

  const handleBNameOnChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleBNotesOnChange = (e) => {
    setboardsTitle(e.target.value);
  };

  const handlePdescOnchange = (e) => {
    setpostitDesc(e.target.value);
  };

  const handlePTitleOnChange = (e) => {
    setpostitTitle(e.target.value);
  };
  const handleOnNextClicker = () => {

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
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <NavigateNextIcon />
          </IconButton>
          <Fab onClick={handleClickOpen} color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
          <FormPostitDialog
            open={postitFormState}
            onFormClose={handleFormClose}
            locationPathName={location.pathname}
            boardName={boardName}
            boardsTitle={boardsTitle}
            postitDesc={postitDesc}
            postitTitle={postitTitle}
            handleBNameOnChange={handleBNameOnChange}
            handleBNotesOnChange={handleBNotesOnChange}
            handlePdescOnchange={handlePdescOnchange}
            handlePTitleOnChange={handlePTitleOnChange}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppToolbar.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);
