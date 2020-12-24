import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Backdrop,
  Grid,
  Box,
} from "@material-ui/core";
import { useStyles, lightTheme, darkTheme } from "./styles";

import SiteNavigation from "./SiteNavigation";
import Resume from "./components/Resume";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import Notifications from "./components/Notifications";
import UserControlPanel from "./components/UserControlPanel";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import EditBlog from "./components/EditBlog";
import Videos from "./components/Videos";
import Video from "./components/Video";
import Sudoku from "./components/Sudoku";
import AlertSnackbar from "./components/AlertSnackbar";

function App() {
  const classes = useStyles()();
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  const [theme, setTheme] = useState();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      setTheme(JSON.parse(localStorageTheme));
    } else {
      const systemReferenceTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      setTheme(systemReferenceTheme);
      localStorage.setItem("theme", JSON.stringify(systemReferenceTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <Router>
      {!isLoaded(auth) || !isLoaded(profile) ? (
        <Backdrop
          className={classes.splashScreen}
          open={!isLoaded(auth) || !isLoaded(profile)}
        >
          <CircularProgress size={100} />
        </Backdrop>
      ) : (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
          <div className={classes.root}>
            <CssBaseline />
            <SiteNavigation
              credential={auth}
              profile={profile}
              theme={theme}
              setTheme={setTheme}
            />
            <main className={classes.content}>
              <div className={classes.toolBar} />
              <Grid container justify="space-evenly">
                <Grid item sm={12} md={9}>
                  <Switch>
                    <Route exact path="/">
                      <Resume
                        credential={auth}
                        profile={profile}
                        theme={theme}
                      />
                    </Route>
                    <Route exact path="/blogs">
                      <Blogs credential={auth} />
                    </Route>
                    <Route path="/createblog">
                      <CreateBlog
                        credential={auth}
                        profile={profile}
                        theme={theme}
                      />
                    </Route>
                    <Route exact path="/blog/:id">
                      <Blog credential={auth} profile={profile} theme={theme} />
                    </Route>
                    <Route exact path="/edit/blog/:id">
                      <EditBlog credential={auth} profile={profile} />
                    </Route>
                    <Route exact path="/videos">
                      <Videos credential={auth} profile={profile} />
                    </Route>
                    <Route exact path="/video/:id">
                      <Video credential={auth} />
                    </Route>
                    <Route exact path="/user/:id">
                      <UserControlPanel credential={auth} profile={profile} />
                    </Route>
                    <Route exact path="/sudoku">
                      <Sudoku />
                    </Route>
                  </Switch>
                </Grid>
                <Grid item md={3}>
                  <Box display={{ xs: "none", sm: "none", md: "block" }}>
                    <Notifications />
                  </Box>
                </Grid>
              </Grid>
            </main>
            <AlertSnackbar />
          </div>
        </ThemeProvider>
      )}
    </Router>
  );
}

export default App;
