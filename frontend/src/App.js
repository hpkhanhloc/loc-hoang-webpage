import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { useStyles, theme } from "./styles";

import SiteNavigation from "./SiteNavigation";
import Resume from "./components/Resume";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";

function App() {
  const classes = useStyles()();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <SiteNavigation />
          <main className={classes.content}>
            <div className={classes.toolBar} />
            <Switch>
              <Route path="/cv">
                <Resume />
              </Route>
              <Route exact path="/blogs">
                <Blogs />
              </Route>
              <Route path="/createblog">
                <CreateBlog />
              </Route>
              <Route exact path="/blog/:id">
                <Blog />
              </Route>
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
