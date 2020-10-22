import React from 'react';
import {
  Drawer as MUIDrawer, ListItem, List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  drawerPaper: { width: 'inherit' },
});

// eslint-disable-next-line no-unused-vars
function Drawer({ state, onDrawerClose, boards }) {
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
          <ListItem key={element.id}>
            <Link to={element.id}>{element.title}</Link>
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
};

export default Drawer;
