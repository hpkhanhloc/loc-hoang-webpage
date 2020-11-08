import React, { useState } from "react";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { storage } from "../config/fbConfig";
import { useStyles } from "../styles";
import { useDispatch } from "react-redux";
import { createVideo } from "../actions/videoAction";

const UploadVideoPopup = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    thumb: "",
    description: "",
    filename: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  const handleUpload = async (event) => {
    setLoading(true);
    event.preventDefault();
    const src = await uploadVideo(file);
    dispatch(createVideo({ ...data, src: src }));
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload video"
        component="span"
        onClick={handleClickOpen}
      >
        <AddIcon fontSize="large" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="thumb"
              label="Thumbnail"
              type="url"
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              onChange={handleChange}
              required
              fullWidth
            />
            <input
              id="video-upload-button"
              accept="video/*"
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
                setData({ ...data, filename: event.target.files[0].name });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleUpload}
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Upload"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const uploadVideoToFirebase = (file) => {
  return new Promise((resolve) => {
    const uploadTask = storage.ref(`videos/${file.name}`).put(file);
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
          .ref("videos")
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

const uploadVideo = async (file) => {
  return new Promise(async (resolve, reject) => {
    const url = await uploadVideoToFirebase(file);
    if (!url) {
      reject();
      return;
    }
    resolve(url);
  });
};

export default UploadVideoPopup;
