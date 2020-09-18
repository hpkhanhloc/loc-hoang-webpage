import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { useStyles, theme } from "./styles";

import SiteNavigation from "./SiteNavigation";
import Resume from "./components/Resume";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

function App() {
  const classes = useStyles()();
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
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
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <SiteNavigation credential={auth} profile={profile} />
            <main className={classes.content}>
              <div className={classes.toolBar} />
              <Switch>
                <Route path="/cv">
                  <Resume credential={auth} />
                </Route>
                <Route exact path="/blogs">
                  <Blogs credential={auth} />
                </Route>
                <Route path="/createblog">
                  <CreateBlog credential={auth} />
                </Route>
                <Route exact path="/blog/:id">
                  <Blog credential={auth} />
                </Route>
              </Switch>
            </main>
          </div>
        </ThemeProvider>
      )}
    </Router>
  );
}

export default App;
