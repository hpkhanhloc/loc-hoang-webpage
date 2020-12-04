import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  FormControl,
  Box,
  Typography,
} from "@material-ui/core";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../actions/blogActions";
import { setAlert } from "../actions/alertAction";
import { useStyles } from "../styles";
import { isEmpty, isLoaded, useFirestoreConnect } from "react-redux-firebase";
import TextEditor from "./TextEditor";

const EditBlog = (props) => {
  const { credential, profile } = props;
  const [editedBlog, setEditedBlog] = useState({ title: "", content: "" });
  const id = useParams().id;
  useFirestoreConnect([`/blogs/${id}`]);
  const blog = useSelector(
    ({ firestore: { data } }) => data.blogs && data.blogs[id]
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handleOnChangeTitle = (event) => {
    setEditedBlog({ ...editedBlog, title: event.target.value });
  };
  const handleOnCancel = (event) => {
    event.preventDefault();
    setEditedBlog({ title: "", content: "" });
    history.push(`/blog/${id}`);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(updateBlog(id, editedBlog));
    history.push(`/blog/${id}`);
  };

  if (!credential.uid || profile.role !== "owner") {
    dispatch(
      setAlert({
        alert: true,
        severity: "warning",
        alertMessage:
          "Access denied! You have not logged in or have not permission to edit blog.",
      })
    );
    return <Redirect to="/" />;
  }
  if (isLoaded(blog) && isEmpty(blog)) {
    dispatch(
      setAlert({
        alert: true,
        severity: "error",
        alertMessage: "Invalid blog",
      })
    );
    return <Redirect to="/blogs" />;
  }

  return (
    isLoaded(blog) && (
      <Container>
        <Paper variant="outlined">
          <Box m={2}>
            <Typography variant="h6" align="center">
              Edit Blog
            </Typography>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                onChange={handleOnChangeTitle}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={blog.title}
                fullWidth
              />
            </FormControl>
            <TextEditor
              content={blog}
              setContent={setEditedBlog}
              border={true}
              minHeight={300}
            />
          </Box>
          <Box m={2} display="flex" flexDirection="row" justifyContent="center">
            <Button
              onClick={handleOnCancel}
              variant="contained"
              color="primary"
              style={{ marginRight: 16 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleOnSubmit}
              variant="contained"
              color="primary"
              style={{ marginRight: 16 }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    )
  );
};

export default EditBlog;
