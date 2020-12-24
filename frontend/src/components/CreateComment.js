import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useStyles } from "../styles";
import TextEditor from "./TextEditor";
import { convertToRaw, EditorState } from "draft-js";
import { createComment } from "../actions/commentActions";

const CreateComment = (props) => {
  const { blogID, theme } = props;
  const [newComment, setNewComment] = useState({
    blogID: blogID,
    content: JSON.stringify(
      convertToRaw(EditorState.createEmpty().getCurrentContent())
    ),
  });
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handlePostComment = (event) => {
    dispatch(createComment(newComment));
    setNewComment({
      ...newComment,
      content: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
    });
  };

  return (
    <Box className={classes.createCommentBox} boxShadow={1}>
      <TextEditor
        content={newComment}
        setContent={setNewComment}
        toolbar={true}
        border={true}
        minHeight={100}
        theme={theme}
      />
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handlePostComment}>
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default CreateComment;
