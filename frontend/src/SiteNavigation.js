import React, { useMemo, forwardRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Drawer,
  Divider,
  ListItemIcon,
  ListItemText,
  List,
  Card,
  CardMedia,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useStyles, ListItem } from "./styles";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BookIcon from "@material-ui/icons/Book";
import CreateIcon from "@material-ui/icons/Create";
import UserInfo from "./components/UserInfo";
import AppBarLogo from "./static/images/logo.png"

const SiteNavigation = (props) => {
  const { credential, profile } = props;
  const [selectedIndex, setSelectedIndex] = useState(1)
  const classes = useStyles()();

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Card style={{display: "flex", background: "transparent", boxShadow: "none"}}>
                <CardMedia style={{ height: 50, width: "auto", marginLeft: "4%"}} component="img" src={AppBarLogo} title="Appbar Logo" />
              </Card>
            </Grid>
            <Grid
              item
              xs={6}
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {credential.uid ? (
                <>
                  <Grid item>
                    <UserInfo profile={profile} />
                  </Grid>
                  <Grid item>
                    <Logout />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item>
                    <Login />
                  </Grid>
                  <Grid item>
                    <SignUp />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolBar} />
        <Divider />
        <List>
          <ListItemLink index={1} to="/" primary="My CV" icon={<AssignmentIndIcon />} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
          {credential.uid && (
            <>
              <ListItemLink index={2} to="/blogs" primary="Blogs" icon={<BookIcon />} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
              <ListItemLink
                index={3}
                to="/createblog"
                primary="Create Blog"
                icon={<CreateIcon/>}
                selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
              />
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

const ListItemLink = ({ index, to, primary, icon, selectedIndex, setSelectedIndex }) => {
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} selected={selectedIndex === index} onClick={event => handleListItemClick(event, index)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={<Typography variant="button">{primary}</Typography>}/>
      </ListItem>
    </li>
  );
};

export default SiteNavigation;
