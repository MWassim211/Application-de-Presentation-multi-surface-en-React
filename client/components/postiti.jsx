import React, { useRef, useEffect } from 'react';
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
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import RestoreIcon from '@material-ui/icons/Restore';
import PropTypes from 'prop-types';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  addDrawPoints, resetDrawPoints, nextBoard, previousBoard, setIndex, nextPostit, previousPostit,
} from '../actions/index';
import OneDollar from '../OneDollar';
import suivantData from '../assets/suivantData';
import precedentData from '../assets/precedentData';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 150,

  },
  fullHeightCard: {
    height: '100%',
  },
  deleteBtn: {
    marginLeft: 'auto',
    color: 'secondary',
  },
  colorIcon: {
    marginLeft: 'auto',
  },
  editBtn: {
    color: green[500],
  },
  box: {
    height: 5,
  },
});

const mapStateToProps = (state) => ({
  // drawing: state.drawing,
  currentPostit: state.currentPostit,

});

const mapDispatchProps = (dispatch) => ({
  addPoints: (x, y, drag, id, idPostit, flag) => dispatch(addDrawPoints({
    x, y, drag, id, idPostit,
  }, { propagate: flag })),
  resetPoints: (id, idPostit, flag) => dispatch(resetDrawPoints({ id, idPostit },
    { propagate: flag })),
  nextBoard: (flag) => dispatch(nextBoard({}, { propagate: flag })),
  previousBoard: (flag) => dispatch(previousBoard({}, { propagate: flag })),
  setIndex: (index, flag) => dispatch(setIndex({ index }, { propagate: flag })),
  nextPostit: (id, idPostit, flag) => dispatch(nextPostit({ id, idPostit }, { propagate: flag })),
  prevPostit: (id, idPostit, flag) => dispatch(previousPostit({ id, idPostit },
    { propagate: flag })),

});

function postit(props) {
  const classes = useStyles();
  const {
    param, handleOnDelete, indexPostit, currentPostit,
  } = props;
  const { id } = useParams();
  // const {clickX,clickY,clickDrag} = props.drawing;
  const { drawing } = param;
  let paint = false;
  const { clickX, clickY, clickDrag } = drawing;

  const handleResetClick = (idB, idPostit) => {
    props.resetPoints(idB, idPostit, true);
  };

  useEffect(() => {
    document.body.addEventListener('touchmove', (evt) => evt.preventDefault(), { passive: false });
    return () => document.body.removeEventListener('touchmove', (evt) => evt.preventDefault());
  }, []);

  const options = {
    score: 80, // The similarity threshold to apply the callback(s)
    parts: 64, // The number of resampling points
    step: 2, // The degree of one single rotation step
    angle: 45, // The last degree of rotation
    size: 250, // The width and height of the scaling bounding box
  };
  const recognizer = new OneDollar(options);

  recognizer.add('triangle', [
    [627, 213],
    [626, 217],
    [617, 234],
    [611, 248],
    [603, 264],
    [590, 287],
    [552, 329],
    [524, 358],
    [489, 383],
    [461, 410],
    [426, 444],
    [416, 454],
    [407, 466],
    [405, 469],
    [411, 469],
    [428, 469],
    [453, 470],
    [513, 478],
    [555, 483],
    [606, 493],
    [658, 499],
    [727, 505],
    [762, 507],
    [785, 508],
    [795, 508],
    [796, 505],
    [796, 503],
    [796, 502],
    [796, 495],
    [790, 473],
    [785, 462],
    [776, 447],
    [767, 430],
    [742, 390],
    [724, 362],
    [708, 340],
    [695, 321],
    [673, 289],
    [664, 272],
    [660, 263],
    [659, 261],
    [658, 256],
    [658, 255],
    [658, 255],
  ]);
  recognizer.add('circle', [
    [621, 225],
    [616, 225],
    [608, 225],
    [601, 225],
    [594, 227],
    [572, 235],
    [562, 241],
    [548, 251],
    [532, 270],
    [504, 314],
    [495, 340],
    [492, 363],
    [492, 385],
    [494, 422],
    [505, 447],
    [524, 470],
    [550, 492],
    [607, 523],
    [649, 531],
    [689, 531],
    [751, 523],
    [782, 510],
    [807, 495],
    [826, 470],
    [851, 420],
    [859, 393],
    [860, 366],
    [858, 339],
    [852, 311],
    [833, 272],
    [815, 248],
    [793, 229],
    [768, 214],
    [729, 198],
    [704, 191],
    [678, 189],
    [655, 188],
    [623, 188],
    [614, 188],
    [611, 188],
    [611, 188],
  ]);
  recognizer.add('suivant', suivantData);

  recognizer.add('precedent', precedentData);
  let gesturePoints = [];
  const refCanvas = useRef(null);

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  function addGesture(x, y) {
    gesturePoints.push([x, y]);
  }

  let gesture;
  function redraw() {
    const context = refCanvas.current.getContext('2d');
    const { width } = refCanvas.current.getBoundingClientRect();
    const { height } = refCanvas.current.getBoundingClientRect();

    // Ceci permet d'adapter la taille du contexte de votre canvas à sa taille sur la page
    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);
    context.clearRect(0, 0, context.width, context.height); // Clears the canvas

    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 2;

    for (let i = 0; i < clickX.length; i += 1) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1] * width, clickY[i - 1] * height);
      } else {
        context.moveTo(clickX[i] * width - 1, clickY[i] * height);
      }
      context.lineTo(clickX[i] * width, clickY[i] * height);
      context.closePath();
      context.stroke();
    }

    gesture = recognizer.check(gesturePoints);
    if (gesture.recognized) {
      context.strokeStyle = '#666';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(gesturePoints[0][0] * width, gesturePoints[0][1] * height);
      for (let i = 1; i < gesturePoints.length; i += 1) {
        context.lineTo(gesturePoints[i][0] * width - 1, gesturePoints[i][1] * height);
      }

      context.stroke();
    }
  }

  function pointerDownHandler(ev) {
    // console.error(
    //   'HEY ! ICI ON PEUT DIFFERENCIER QUEL TYPE DE POINTEUR EST UTILISE !',
    // );

    const { width } = refCanvas.current.getBoundingClientRect();
    const { height } = refCanvas.current.getBoundingClientRect();
    const { top, left } = refCanvas.current.getBoundingClientRect();
    paint = true;

    switch (ev.pointerType) {
      case 'pen':
        addClick(
          ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
          ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
          false,
        );
        break;
      case 'touch':
        addGesture(
          ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
          ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
        );
        console.log(gesturePoints);
        break;
      case 'mouse':
        addClick(
          ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
          ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
          false,
        );
        break;
      default:
        redraw();
    }
    redraw();
  }

  function pointerMoveHandler(ev) {
    if (paint) {
      const {
        width, height, top, left,
      } = refCanvas.current.getBoundingClientRect();
      switch (ev.pointerType) {
        case 'pen':
          addClick(
            ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
            ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
            true,
          );
          break;
        case 'touch':
          addGesture(
            ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
            ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
          );
          console.log(gesturePoints);
          break;
        case 'mouse':
          addClick(
            ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
            ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
            true,
          );
          break;
        default:
          redraw();
      }
      redraw();
    }
  }

  useEffect(() => {
    redraw();
  }, [clickX]);

  function pointerUpEvent(ev) {
    switch (ev.pointerType) {
      case 'pen':
        props.addPoints(clickX, clickY, clickDrag, id, indexPostit, true);
        break;
      case 'touch':
        if (gesture.recognized) {
          switch (gesture.name) {
            case 'triangle': {
              props.nextBoard(true);
              break;
            }
            case 'circle': {
              props.previousBoard(true);
              break;
            }
            case 'suivant': {
              props.nextPostit(id, currentPostit, false);
              break;
            }
            case 'precedent': {
              props.prevPostit(id, currentPostit, false);
              break;
            }
            default: {
              break;
            }
          }
        }
        gesturePoints = [];
        break;
      case 'mouse':
        props.addPoints(clickX, clickY, clickDrag, id, indexPostit, true);
        break;
      default: {
        break;
      }
    }

    // props.addPoints(clickX,clickY,clickDrag,id,indexPostit,true)

    paint = false;
  }

  return (
    <div>
      <Card style={{ backgroundColor: 'yellow' }}>
        <CardContent className={classes.root}>
          <Typography gutterBottom variant="h5" component="h2">
            {param.title}
            <IconButton edge="start" style={{ marginLeft: 'auto' }}>
              <FiberManualRecordIcon />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {param.text}
          </Typography>
          <Box className={classes.box}>
            <canvas
              className="stroke"
              ref={refCanvas}
              onPointerDown={pointerDownHandler}
              onPointerMove={pointerMoveHandler}
              onPointerUp={pointerUpEvent}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton edge="start" className={classes.editBtn}>
            <EditIcon />
          </IconButton>
          <IconButton edge="start" onClick={() => handleResetClick(id, indexPostit)}>
            <RestoreIcon />
          </IconButton>
          <IconButton edge="start" style={{ marginLeft: 'auto' }} color="secondary" onClick={() => handleOnDelete(param.board, param.title)}>
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
  indexPostit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchProps)(postit);
