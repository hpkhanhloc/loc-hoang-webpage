import React, { useMemo, forwardRef, useState } from "react";
import clsx from "clsx";
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
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Backdrop,
} from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useStyles, ListItem } from "./styles";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import CreateIcon from "@material-ui/icons/Create";
import UserInfo from "./components/UserInfo";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import MenuIcon from "@material-ui/icons/Menu";
import GamesIcon from "@material-ui/icons/Games";
import AppBarAvatar from "./static/images/avatar.jpg";

const SiteNavigation = (props) => {
  const { credential, profile, theme, setTheme } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const themeIcon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const classes = useStyles()();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const CustomAppBar = (props) => {
    const classes = useStyles()(props);
    return <AppBar className={classes.appBar} {...props} />;
  };
  CustomAppBar.muiName = AppBar.muiName;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChangeTheme = (event) => {
    event.preventDefault();
    setTheme(!theme);
  };

  return (
    <>
      <CustomAppBar background={theme.toString()}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item container xs={1} sm={6} alignItems="center">
              <Tooltip title="Navigation menu">
                <IconButton
                  aria-label="toggle drawer"
                  onClick={handleDrawerToggle}
                  style={{ marginLeft: -18 }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Box
                onClick={() => history.push("/")}
                display={{ xs: "none", md: "flex" }}
                className={classes.appBarLogo}
              >
                <Avatar
                  aria-label="appbarAvatar"
                  className={classes.mediumAvatar}
                  src={AppBarAvatar}
                />
                <Typography
                  color="textPrimary"
                  variant="h5"
                  noWrap
                  style={{ marginLeft: 8 }}
                >
                  Hello! I'm Loc Hoang
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={11}
              sm={6}
              container
              spacing={3}
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <IconButton
                edge="end"
                aria-label="theme mode"
                onClick={handleChangeTheme}
              >
                {themeIcon}
              </IconButton>
              {credential.uid ? (
                <Grid item>
                  <UserInfo credential={credential} profile={profile} />
                </Grid>
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
      </CustomAppBar>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerPaperOpen]: open,
          [classes.drawerPaperClose]: !open,
        })}
        variant="permanent"
        anchor="left"
        classes={{
          paper: clsx({
            [classes.drawerPaperOpen]: open,
            [classes.drawerPaperClose]: !open,
          }),
        }}
        open={open}
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
            handleDrawerClose={handleDrawerClose}
          />
          {credential.uid && (
            <>
              <ListItemLink
                index={2}
                to="/videos"
                primary="Machine Learning Video Player"
                icon={<MovieFilterIcon />}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                handleDrawerClose={handleDrawerClose}
              />
              <ListItemLink
                index={3}
                to="/blogs"
                primary="Blogs"
                icon={<DescriptionIcon />}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                handleDrawerClose={handleDrawerClose}
              />
              {profile.role === "owner" && (
                <ListItemLink
                  index={4}
                  to="/createblog"
                  primary="Create Blog"
                  icon={<CreateIcon />}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  handleDrawerClose={handleDrawerClose}
                />
              )}
            </>
          )}
          <ListItemLink
            index={5}
            to="/sudoku"
            primary="Sudoku"
            icon={<GamesIcon />}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            handleDrawerClose={handleDrawerClose}
          />
        </List>
      </Drawer>
      <Backdrop
        open={open}
        onClick={handleDrawerClose}
        className={classes.drawerBackdrop}
      />
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
  handleDrawerClose,
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
        onClick={(event) => {
          handleDrawerClose();
          handleListItemClick(event, index);
        }}
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
