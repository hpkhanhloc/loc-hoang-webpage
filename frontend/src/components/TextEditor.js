import React, { useRef, useState, useEffect } from "react";
import MUIRichTextEditor from "mui-rte";
import {
  Button,
  Grid,
  IconButton,
  MuiThemeProvider,
  Popover,
  TextField,
} from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { theme, useStyles } from "../styles";
import { storage } from "../config/fbConfig";

const TextEditor = (props) => {
  const ref = useRef(null);
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles()();

  const handleFileUpload = (file) => {
    ref.current.insertAtomicBlockAsync(
      "IMAGE",
      uploadImage(file),
      "Uploading now..."
    );
  };

  const uploadImageToFirebase = (file) => {
    return new Promise((resolve) => {
      const unique = Math.round(new Date().getTime() / 1000);
      const uploadTask = storage.ref(`images/${file.name}_${unique}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot) {
            case "paused":
              console.log("Upload is pause");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              resolve(url);
            })
            .catch((error) => console.log(error));
        }
      );
    });
  };

  const uploadImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      const url = await uploadImageToFirebase(file);
      if (!url) {
        reject();
        return;
      }
      resolve({
        data: {
          url: url,
          width: 300,
          height: 200,
          alignment: "left",
          type: "image",
        },
      });
    });
  };

  const UploadImagePopover = (props) => {
    const [state, setState] = useState({
      anchor: null,
      isCancelled: false,
    });
    const [data, setData] = useState({});

    useEffect(() => {
      setState({
        anchor: props.anchor,
        isCancelled: false,
      });
      setData({
        file: undefined,
      });
    }, [props.anchor]);

    return (
      <Popover
        anchorEl={state.anchor}
        open={state.anchor !== null}
        onExited={() => {
          props.onSubmit(data, !state.isCancelled);
        }}
        onClose={() => {
          props.onSubmit(data, !state.isCancelled);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Grid container spacing={1} className={classes.uploadImagePopover}>
          <Grid item xs={10}>
            <TextField
              style={{ width: "100%" }}
              disabled
              value={data.file?.name || ""}
              placeholder="Click icon to attach image"
            />
          </Grid>
          <Grid item xs={2}>
            <input
              id="contained-button-file"
              style={{ display: "none" }}
              accept="image/*"
              type="file"
              onChange={(event) => {
                setData({ ...data, file: event.target.files[0] });
              }}
            />
            <label htmlFor="contained-button-file">
              <IconButton
                color="primary"
                aria-label="upload image"
                component="span"
              >
                <AttachFileIcon />
              </IconButton>
            </label>
          </Grid>
          <Grid item container xs={12} justify="flex-end">
            <Button
              onClick={() => {
                setState({ anchor: null, isCancelled: true });
              }}
            >
              <CloseIcon />
            </Button>
            <Button
              onClick={() => {
                setState({ anchor: null, isCancelled: false });
              }}
            >
              <DoneIcon />
            </Button>
          </Grid>
        </Grid>
      </Popover>
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <UploadImagePopover
        anchor={anchor}
        onSubmit={(data, insert) => {
          if (insert && data.file) {
            handleFileUpload(data.file);
          }
          setAnchor(null);
        }}
      />
      <MUIRichTextEditor
        ref={ref}
        controls={[
          "title",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "highlight",
          "undo",
          "redo",
          "link",
          "media",
          "numberList",
          "bulletList",
          "quote",
          "code",
          "upload-image",
        ]}
        customControls={[
          {
            name: "upload-image",
            icon: <BackupIcon />,
            type: "callback",
            onClick: (_editorState, _name, anchor) => {
              setAnchor(anchor);
            },
          },
        ]}
        draftEditorProps={{
          handleDroppedFiles: (_selectionState, files) => {
            if (files.length && files[0].name !== undefined) {
              handleFileUpload(files[0]);
              return "handled";
            }
            return "not-handled";
          },
        }}
      />
    </MuiThemeProvider>
  );
};

export default TextEditor;
