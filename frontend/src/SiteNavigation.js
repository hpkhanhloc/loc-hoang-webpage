import React, { useMemo, forwardRef } from 'react';
import { AppBar, Toolbar, Grid, Typography, Drawer, Divider, ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { useStyles } from './styles';
import Login from './components/Login';
import SignUp from './components/SignUp';

const SiteNavigation = () => {
    const classes = useStyles()()
    return(
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={6}>
                            <Typography variant="h6" noWrap>
                                Loc Hoang's web page
                            </Typography>
                        </Grid>
                        <Grid item xs={6} container spacing={3} direction="row" justify="center" alignItems="center">
                            <Grid item>
                                <Login />
                            </Grid>
                            <Grid item>
                                <SignUp />
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper}}
            >
                <div className={classes.toolBar} />
                <Divider />
                <List>
                    <ListItemLink
                        to="/cv"
                        primary="My CV"
                    />
                    <ListItemLink
                        to="/blogs"
                        primary="Blogs"
                    />
                </List>
            </Drawer>
        </>
    )
}

const ListItemLink = ({to, primary, icon}) => {
    const renderLink = useMemo(() =>
        forwardRef((itemProps, ref) => (
            <RouterLink to={to} ref={ref} {...itemProps} />
        )),
        [to]
    )

    return(
        <li>
            <ListItem button component={renderLink}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    )
}

export default SiteNavigation;
