/* eslint-disable */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar , IconButton , MenuIcon , Typography} from '@material-ui/core'


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

 function AppToolbar(){
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        My tool bar
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default AppToolbar;
