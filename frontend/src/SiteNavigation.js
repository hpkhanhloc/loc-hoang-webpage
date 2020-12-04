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
  IconButton,
} from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { Link as RouterLink } from "react-router-dom";
import { useStyles, ListItem } from "./styles";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BookIcon from "@material-ui/icons/Book";
import CreateIcon from "@material-ui/icons/Create";
import UserInfo from "./components/UserInfo";
import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import AppBarLightLogo from "./static/images/logo.png";
import AppBarDarkLogo from "./static/images/logodark.png";

const SiteNavigation = (props) => {
  const { credential, profile, theme, setTheme } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const themeIcon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const classes = useStyles()();

  const CustomAppBar = (props) => {
    const classes = useStyles()(props);
    return <AppBar className={classes.appBar} {...props} />;
  };
  CustomAppBar.muiName = AppBar.muiName;

  return (
    <>
      <CustomAppBar background={theme.toString()}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Card
                style={{
                  display: "flex",
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  style={{ height: 50, width: "auto", marginLeft: "4%" }}
                  component="img"
                  src={theme ? AppBarLightLogo : AppBarDarkLogo}
                  title="Appbar Logo"
                />
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
              <IconButton
                edge="end"
                color="inherit"
                aria-label="theme mode"
                onClick={() => setTheme(!theme)}
              >
                {themeIcon}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </CustomAppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolBar} />
        <Divider />
        <List>
          <ListItemLink
            index={1}
            to="/"
            primary="My CV"
            icon={<AssignmentIndIcon />}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          {credential.uid && (
            <>
              <ListItemLink
                index={2}
                to="/videos"
                primary="Machine Learning Video Player"
                icon={<FeaturedVideoIcon />}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
              <ListItemLink
                index={3}
                to="/blogs"
                primary="Blogs"
                icon={<BookIcon />}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
              {profile.role === "owner" && (
                <ListItemLink
                  index={4}
                  to="/createblog"
                  primary="Create Blog"
                  icon={<CreateIcon />}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

const ListItemLink = ({
  index,
  to,
  primary,
  icon,
  selectedIndex,
  setSelectedIndex,
}) => {
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        component={renderLink}
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          primary={<Typography variant="button">{primary}</Typography>}
        />
      </ListItem>
    </li>
  );
};

export default SiteNavigation;
