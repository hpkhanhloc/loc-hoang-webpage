import { makeStyles, createMuiTheme, withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import MuiListItem from "@material-ui/core/ListItem";

const useStyles = () => {
  return makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: "fixed",
      background: "linear-gradient(135deg, #0fb9b1, #3fc7c0)",
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
      color: "black",
      fontWeight: "bold"
    },
    formControl: {
      padding: theme.spacing(2),
    },
    blogCard: {
      margin: theme.spacing(2),
    },
    splashScreen: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    card: {
      height: 64,
      backgroundColor: "transparent",
      border: 0,
      boxShadow: "none",
      color: "white",
    },
    avatar: {
      backgroundColor: red[500],
    },
    uploadImagePopover: {
      padding: 10,
      maxWidth: 350,
    },
    deleteButton: {
      color: "#eb3b5a"
    },
  }));
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0fb9b1",
    },
    secondary: {
      main: "#f7b731",
    },
    error: {
      main: "#eb3b5a",
    },
    warning: {
      main: "#fa8231",
    },
    info: {
      main: "#2d98da",
    },
    success: {
      main: "#20bf6b",
    },
  },
  typography: {
    fontFamily: 'Nunito',
    h6: {
      fontWeight: "bold",
    },
    button: {
      fontWeight: "bold",
    },
  },
  overrides: {
    MUIRichTextEditor: {
      root: {
        margin: 16,
      },
      toolbar: {
        alignment: "center",
      },
      editor: {
        border: (props) => (props.border ? props.border : ""),
        borderRadius: 5,
        padding: 16,
        minHeight: (props) => (props.minHeight ? props.minHeight : ""),
        "&:hover": {
          cursor: "text",
        },
      },
      editorContainer: {
        margin: 0,
        padding: 0,
        minHeight: 260,
      },
    },
  },
});

const ListItem = withStyles({
  root: {
    "&$selected": {
      color: "#2d98da",
    },
    "&:hover": {
      backgroundColor: "#d1d8e0",
    }
  },
  selected: {}
})(MuiListItem)

export { useStyles, theme, ListItem };
