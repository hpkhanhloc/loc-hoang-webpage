import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const useStyles = () => {
  return makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: "fixed",
      background: "linear-gradient(135deg, #0019af, #0068F0)",
      color: "#fff",
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    toolBar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    authButton: {
      color: "white",
    },
    formControl: {
      padding: theme.spacing(2),
    },
    blogCard: {
      margin: theme.spacing(2),
      height: 200,
    },
    splashScreen: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
});

export { useStyles, theme };
