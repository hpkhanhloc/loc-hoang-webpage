import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { useStyles, theme } from './styles'

import SiteNavigation from "./SiteNavigation"
import Resume from './components/Resume';
import Blog from './components/Blog';
import Login from './components/Login';

function App() {
  const classes = useStyles()()
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
              <Route path="/blogs">
                <Blog />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App;
