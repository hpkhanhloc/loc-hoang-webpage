import React, { useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { storage } from "../config/fbConfig";
import { useDispatch } from "react-redux";
import { updateUserInformation } from "../actions/authActions";

const UploadAvatarPopup = (props) => {
  const { userId } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
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

  const handleUpload = async (event) => {
    setLoading(true);
    event.preventDefault();
    const src = await uploadAvatar(file);
    dispatch(updateUserInformation(userId, { avatar: src }));
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Change avatar">
        <IconButton
          color="primary"
          aria-label="upload avatar"
          component="span"
          onClick={handleClickOpen}
        >
          <PhotoCameraIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogContent>
            <input
              id="avatar-upload-button"
              accept="image/*"
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

const uploadAvatarToFirebase = (file) => {
  return new Promise((resolve) => {
    const uploadTask = storage.ref(`avatars/${file.name}`).put(file);
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
          .ref("avatars")
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

const uploadAvatar = async (file) => {
  return new Promise(async (resolve, reject) => {
    const url = await uploadAvatarToFirebase(file);
    if (!url) {
      reject();
      return;
    }
    resolve(url);
  });
};

export default UploadAvatarPopup;
