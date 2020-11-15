import React, { useEffect, useState } from 'react';
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
import { withRouter } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import DeleteIcon from '@material-ui/icons/Delete';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Drawer from './Drawer';
import FormPostitDialog from './FormPostitDialog';

import {
  createPostit, createBoard, previousBoard, nextBoard, setIndex, deleteBoard,
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
  appBar: {
    top: 0,
    bottom: 'auto',
  },
}));

const mapStateToProps = (state) => ({
  boards: state.boards,
  index: state.index,
});

const mapDispatchToProps = (dispatch) => ({
  createBoard: (name, title, flag) => dispatch(createBoard({ name, title }, { propagate: flag })),
  createPostit: (desc, title, idBoard) => dispatch(createPostit({ desc, title, idBoard })),
  nextBoard: (flag) => dispatch(nextBoard({}, { propagate: flag })),
  previousBoard: (flag) => dispatch(previousBoard({}, { propagate: flag })),
  setIndex: (index, flag) => dispatch(setIndex({ index }, { propagate: flag })),
  deleteBoard: (idBoard, flag) => dispatch(deleteBoard({ id: idBoard }, { propagate: flag })),
});

function AppToolbar(props) {
  const classes = useStyles();
  const { boards, index, isMobile } = props;
  const [state, setState] = useState(false);
  const [fullScreen, setfullScreen] = useState(false);
  const [postitFormState, setPostitFormState] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardsTitle, setboardsTitle] = useState('');

  useEffect(() => {
    props.history.push(`/${index}`);
  }, [index]);

  const handleOnClickMenu = () => {
    setState(true);
  };
  const handleOnClose = () => {
    setState(false);
  };

  const handleOnLinkClick = (slide) => {
    setState(false);
    props.setIndex(slide, true);
  };

  const handleClickOpen = () => {
    setPostitFormState(true);
  };

  const handleFormNoAction = () => {
    setPostitFormState(false);
  };

  const handleFormClose = () => {
    setPostitFormState(false);
    props.createBoard(boardName, boardsTitle, true);
    setBoardName('');
    setboardsTitle('');
  };

  const handleBNameOnChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleBNotesOnChange = (e) => {
    setboardsTitle(e.target.value);
  };

  const handleOnNextClick = () => {
    props.nextBoard(true);
  };

  const handleOnPreviousClick = () => {
    props.previousBoard(true);
  };

  const handleFullscreenClick = () => {
    document.documentElement.requestFullscreen();
    setfullScreen(true);
  };

  const handleFullscreenExit = () => {
    document.exitFullscreen();
    setfullScreen(false);
  };

  const handleDeleteBoardClick = (idB) => {
    props.deleteBoard(idB, true);
  };

  const GetIndexTitle = () => {
    if (boards.findIndex((e) => e.id === index.toString()) === -1 || boards.length === 0) {
      return -1;
    }
    return boards.findIndex((e) => e.id === index.toString());
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={handleOnClickMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer
            state={state}
            onDrawerClose={handleOnClose}
            boards={boards}
            onLinkClick={handleOnLinkClick}
          />
          <Typography variant="h6" className={classes.title}>
            { !isMobile && GetIndexTitle() !== -1 ? boards[GetIndexTitle()].title : '' }
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleOnPreviousClick}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleOnNextClick}>
            <NavigateNextIcon />
          </IconButton>
          {fullScreen === false
            ? (
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleFullscreenClick}>
                <FullscreenIcon />
              </IconButton>
            )
            : (
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleFullscreenExit}>
                <FullscreenExitIcon />
              </IconButton>
            )}
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => handleDeleteBoardClick(index.toString())}>
            <DeleteIcon />
          </IconButton>
          <Fab onClick={handleClickOpen} color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
          <FormPostitDialog
            action="Create Board"
            open={postitFormState}
            onFormClose={handleFormClose}
            boardName={boardName}
            boardsTitle={boardsTitle}
            handleBNameOnChange={handleBNameOnChange}
            handleBNotesOnChange={handleBNotesOnChange}
            onCloseNoAction={handleFormNoAction}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppToolbar.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setIndex: PropTypes.func.isRequired,
  createBoard: PropTypes.func.isRequired,
  previousBoard: PropTypes.func.isRequired,
  nextBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppToolbar));
