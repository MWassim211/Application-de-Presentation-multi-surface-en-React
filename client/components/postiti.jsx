/* eslint-disable  */
import React , {useRef,  useEffect}from 'react';
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
import {useParams} from 'react-router-dom';
import { addDrawPoints ,resetDrawPoints} from '../actions/index';
import RestoreIcon from '@material-ui/icons/Restore';

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
  box : {
    height : 5,
  }
});

const mapStateToProps = (state) => {
  return {
    // drawing: state.drawing,
    
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    addPoints: (x, y, drag,id,idPostit,flag) => dispatch(addDrawPoints({x, y, drag,id,idPostit}, {propagate :flag})),
    resetPoints : (id,idPostit,flag) => dispatch(resetDrawPoints({id,idPostit}, {propagate :flag}))
  };
};


function postit(props) {
  const classes = useStyles();
  const { param, handleOnDelete ,indexPostit} = props;
  const {id} = useParams();
  // const {clickX,clickY,clickDrag} = props.drawing;
  const {drawing} = param;
  var paint = false;
  console.log(drawing);
  console.log("---------------------------------------------")
  var {clickX,clickY,clickDrag} = drawing;
  // var clickX = new Array();
  // var clickY = new Array();
  // var clickDrag = new Array();

  const handleResetClick = (id,idPostit)=> {
    props.resetPoints(id,idPostit,true);
  }

  useEffect(()=>{
    console.log(clickX)
    console.log('hihihi')
     redraw()
  },[clickX])

  // Cette ligne permet d'avoir accès à notre canvas après que le composant aie été rendu. Le canvas est alors disponible via refCanvas.current
  // Si vous utilisez des Class Components plutôt que des function Components, voir ici https://stackoverflow.com/a/54620836
  let refCanvas = useRef(null);

  function addClick(x, y, dragging) {
    clickX.push(x), clickY.push(y), clickDrag.push(dragging);
  }

  function redraw() {
    let context = refCanvas.current.getContext("2d");
    let width = refCanvas.current.getBoundingClientRect().width;
    let height = refCanvas.current.getBoundingClientRect().height;
  
    //Ceci permet d'adapter la taille du contexte de votre canvas à sa taille sur la page
    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);
    context.clearRect(0, 0, context.width, context.height); // Clears the canvas
  
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 2;
  
    for (var i = 0; i < clickX.length; i++) {
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
  }
  
  function pointerDownHandler(ev) {
    console.error(
      "HEY ! ICI ON PEUT DIFFERENCIER QUEL TYPE DE POINTEUR EST UTILISE !"
    );
  
    let width = refCanvas.current.getBoundingClientRect().width;
    let height = refCanvas.current.getBoundingClientRect().height;
    var mouseX = (ev.pageX - refCanvas.current.offsetLeft) / width;
    var mouseY = (ev.pageY - refCanvas.current.offsetTop) / height;
  
    paint = true;
    addClick(mouseX, mouseY, false);
    console.log(clickX);
    // props.addPoints(clickX,clickY,clickDrag)
    redraw();
  }
  
  function pointerMoveHandler(ev) {
    if (paint) {
      let width = refCanvas.current.getBoundingClientRect().width;
      let height = refCanvas.current.getBoundingClientRect().height;
      addClick(
        (ev.pageX - refCanvas.current.offsetLeft) / width,
        (ev.pageY - refCanvas.current.offsetTop) / height,
        true
      );
      // console.log(clickX);
      redraw();
    }
  }
  
  function pointerUpEvent(ev) {
    console.log("checker hna")
    props.addPoints(clickX,clickY,clickDrag,id,indexPostit,true)
    paint = false;
  }


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
          <Box className={classes.box}>
            <canvas
              className="stroke"
              ref={refCanvas}
              onPointerDown={pointerDownHandler}
              onPointerMove={pointerMoveHandler}
              onPointerUp={pointerUpEvent}
            ></canvas>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton edge="start" className={classes.editBtn}>
            <EditIcon />
          </IconButton>
          <IconButton edge="start" onClick={()=>handleResetClick(id,indexPostit)} >
            <RestoreIcon />
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
  indexPostit : PropTypes.number.isRequired,
};

export default connect(mapStateToProps,mapDispatchProps)(postit);
