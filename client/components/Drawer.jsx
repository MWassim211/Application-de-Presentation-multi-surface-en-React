import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  Drawer as MUIDrawer, ListItem, List, ListItemText, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  drawerPaper: { width: 'inherit' },
});

// eslint-disable-next-line no-unused-vars
function Drawer({
  state, onDrawerClose, boards, onLinkClick,
}) {
  const classes = useStyles();

  return (
    <MUIDrawer
      variant="temporary"
      style={{ width: '220px' }}
      anchor="left"
      open={state}
      onClose={onDrawerClose}
      classes={{ paper: classes.drawerPaper }}
    >
      <List>
        {boards.map((element) => (
          <ListItem key={element.id} onClick={() => onLinkClick(element.id)}>
            {/* <Link to={element.id}>{element.title}</Link> */}
            <Button>{element.title}</Button>
            {/* <ListItemText>{element.title}</ListItemText> */}
          </ListItem>
        ))}
      </List>
    </MUIDrawer>
  );
}

Drawer.propTypes = {
  state: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default Drawer;
