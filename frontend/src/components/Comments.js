import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Divider,
  Box,
  Avatar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { useStyles } from "../styles";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextEditor from "./TextEditor";
import { deleteComment, updateComment } from "../actions/commentActions";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

const Comments = (props) => {
  const { credential, blogID, theme } = props;
  useFirestoreConnect([
    {
      collection: "comments",
      where: ["blogID", "==", blogID],
    },
  ]);
  const comments = useSelector((state) => state.firestore.ordered.comments);

  if (!credential.uid) {
    return <Redirect to="/" />;
  }

  return (
    <Box mt={2}>
      {comments &&
        comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              credential={credential}
              theme={theme}
            />
          );
        })}
    </Box>
  );
};

const Comment = (props) => {
  const { comment, credential, theme } = props;
  useFirestoreConnect([`/users/${comment.authorID}`]);
  const author = useSelector(
    ({ firestore: { data } }) => data.users && data.users[comment.authorID]
  );
  const [edit, setEdit] = useState(false);
  const [editedContent, setEditedContent] = useState({ content: "" });
  const classes = useStyles()();

  const dispatch = useDispatch();

  const handleOnEdit = (event) => {
    event.preventDefault();
    setEdit(true);
  };

  const handleOnSave = (event) => {
    event.preventDefault();
    dispatch(updateComment(comment.id, editedContent));
    setEdit(false);
  };

  const handleOnCancel = () => {
    window.location.reload();
  };

  const handleOnDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(updateComment(comment.id, { like: Number(comment.like) + 1 }));
  };

  const handleDislike = (event) => {
    event.preventDefault();
    dispatch(
      updateComment(comment.id, { dislike: Number(comment.dislike) + 1 })
    );
  };

  return (
    isLoaded(author) && (
      <Box p={2} display="flex" flexDirection="row">
        <Avatar
          aria-label="userAvatar"
          src={author.avatar}
          className={classes.smallAvatar}
        />
        <Box
          className={classes.commentBox}
          flexGrow={1}
          boxShadow={1}
          alignItems="center"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box>
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >{`Posted by ${comment.authorFirstName} ${
                comment.authorLastName
              } - ${moment(
                comment.createdAt.toDate()
              ).calendar()}`}</Typography>
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="flex-end">
              {comment.authorID === credential.uid && (
                <>
                  {edit ? (
                    <>
                      <IconButton color="secondary" onClick={handleOnCancel}>
                        <CloseIcon />
                      </IconButton>
                      <IconButton color="primary" onClick={handleOnSave}>
                        <DoneIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton color="primary" onClick={handleOnEdit}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton color="primary" onClick={handleOnDelete}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
              <IconButton
                aria-label="like"
                color="primary"
                onClick={handleLike}
              >
                <Badge
                  badgeContent={comment.like}
                  color="secondary"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <ThumbUpIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="dislike"
                color="secondary"
                onClick={handleDislike}
              >
                <Badge
                  badgeContent={comment.dislike}
                  color="secondary"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <ThumbDownIcon />
                </Badge>
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <TextEditor
            content={comment}
            setContent={setEditedContent}
            toolbar={edit}
            readOnly={!edit}
            theme={theme}
          />
        </Box>
      </Box>
    )
  );
};

export default Comments;
