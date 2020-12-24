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
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBlog } from "../actions/blogActions";
import { setAlert } from "../actions/alertActions";
import { useStyles } from "../styles";
import TextEditor from "./TextEditor";
import { convertToRaw, EditorState } from "draft-js";

const CreateBlog = (props) => {
  const { credential, profile, theme } = props;
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: JSON.stringify(
      convertToRaw(EditorState.createEmpty().getCurrentContent())
    ),
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handleOnChangeTitle = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };
  const handleOnCancel = (event) => {
    event.preventDefault();
    setNewBlog({ title: "", content: "" });
    history.push("/blogs");
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog(newBlog));
    history.push("/blogs");
  };

  if (!credential.uid || profile.role !== "owner") {
    dispatch(
      setAlert({
        alert: true,
        severity: "warning",
        alertMessage:
          "Access denied! You have not logged in or have not permission to create blog.",
      })
    );
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Paper variant="outlined">
        <Box m={2}>
          <Typography variant="h6" align="center">
            New Blog
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
              fullWidth
            />
          </FormControl>
          <TextEditor
            content={newBlog}
            setContent={setNewBlog}
            toolbar={true}
            theme={theme}
            minHeight={300}
            border={true}
          />
        </Box>
        <Box m={2} display="flex" flexDirection="row" justifyContent="center">
          <Button
            onClick={handleOnCancel}
            variant="contained"
            color="secondary"
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
            Create
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBlog;
