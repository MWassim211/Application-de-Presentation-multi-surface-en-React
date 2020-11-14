import React from 'react';
import {
  Drawer as MUIDrawer, ListItem, List, Button, Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  drawerPaper: { width: 'inherit' },
  iconDrawer: {
    flow: 1,
  },
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
        <ListItem style={{ justifyContent: 'center' }}><b>Boards List</b></ListItem>
        <Divider />
        {boards.map((element) => (
          <ListItem key={element.id} onClick={() => onLinkClick(element.id)}>
            <Button>
              <ListAltIcon />
              <div className={classes.iconDrawer}>
                {element.title}
              </div>
            </Button>
          </ListItem>
        ))}
        <Divider />
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
