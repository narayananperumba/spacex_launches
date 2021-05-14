import React from 'react';
import styles from '../styles/Style'
import {AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import {ViewList as ViewListIcon, ViewModule as ViewModuleIcon} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { IconButton } from '@material-ui/core';




export default function Header({view, handleView, toggleView}){
    const classes = styles();

return (
    <AppBar position="sticky">
        <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
            SpaceX
            </Typography>
            <IconButton color="inherit" onClick={() => toggleView(view)}>
            { view === 'list' ? <ViewModuleIcon /> : <ViewListIcon />}
            </IconButton>
            {/* <ToggleButtonGroup value={view} exclusive classes={{root:classes.flexClass}} onChange={handleView}>
            <ToggleButton title="List View" value="list" aria-label="list" >
                <ViewListIcon style={{ color: "white" }} />
            </ToggleButton>
            <ToggleButton title="Grid View" value="grid" aria-label="module">
                <ViewModuleIcon style={{ color: "white" }} />
            </ToggleButton>
            </ToggleButtonGroup> */}
            <Button color="inherit">Login</Button>
            {/* <Button color="inherit">Login</Button> 
            color should be as per theme
            */}
            <Button color="inherit">Signup</Button>
        </Toolbar>
    </AppBar>
)
}