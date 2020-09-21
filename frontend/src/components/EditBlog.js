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
import { useStyles } from "../styles";
import { isEmpty, isLoaded, useFirestoreConnect } from "react-redux-firebase";

const EditBlog = (props) => {
  const { credential } = props;
  const [editedBlog, setEditedBlog] = useState({ title: "", content: "" });
  const id = useParams().id;
  useFirestoreConnect([`/blogs/${id}`]);
  const blog = useSelector(
    ({ firestore: { data } }) => data.blogs && data.blogs[id]
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handleChange = (event) => {
    setEditedBlog({ ...editedBlog, [event.target.id]: event.target.value });
  };
  const handleCancel = (event) => {
    event.preventDefault();
    setEditedBlog({ title: "", content: "" });
    history.push(`/blog/${id}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateBlog(id, editedBlog));
    history.push(`/blog/${id}`);
  };

  if (!credential.uid) {
    return <Redirect to="/" />;
  }
  if (isLoaded(blog) && isEmpty(blog)) {
    console.log("invalid blog");
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
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={blog.title}
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                id="content"
                label="Content"
                variant="outlined"
                onChange={handleChange}
                multiline={true}
                rows={10}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={blog.content}
                fullWidth
              />
            </FormControl>
          </Box>
          <Box m={2} display="flex" flexDirection="row" justifyContent="center">
            <Button
              onClick={handleCancel}
              variant="contained"
              color="primary"
              style={{ marginRight: 16 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
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
