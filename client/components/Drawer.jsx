import React from 'react';
import {
  Drawer as MUIDrawer, ListItem, List, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  drawerPaper: { width: 'inherit' },
});

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
            <Button>{element.title}</Button>
          </ListItem>
        ))}
      </List>
    </MUIDrawer>
  );
}

Drawer.propTypes = {
  state: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  boards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default Drawer;
