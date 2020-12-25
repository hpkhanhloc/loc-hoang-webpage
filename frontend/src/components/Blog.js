import React from "react";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  LinearProgress,
  Divider,
  IconButton,
  Badge,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { deleteBlog, updateBlog } from "../actions/blogActions";
import MUIRichTextEditor from "mui-rte";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const Blog = (props) => {
  const { credential, profile, theme } = props;
  const id = useParams().id;
  useFirestoreConnect([`/blogs/${id}`]);
  const blog = useSelector(
    ({ firestore: { data } }) => data.blogs && data.blogs[id]
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    dispatch(deleteBlog(id));
    history.push("/blogs");
  };

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(updateBlog(id, { like: Number(blog.like) + 1 }));
  };

  const handleDislike = (event) => {
    event.preventDefault();
    dispatch(updateBlog(id, { dislike: Number(blog.dislike) + 1 }));
  };

  if (!credential.uid) {
    return <Redirect to="/" />;
  }

  if (!isLoaded(blog)) {
    return <LinearProgress />;
  }
  return (
    <Container>
      <Paper>
        <Box p={2}>
          {isEmpty(blog) ? (
            <Typography variant="h5">Can not find blog!</Typography>
          ) : (
            <>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="h5">{blog.title}</Typography>
                </Box>
                <Box display={profile.role !== "owner" ? "none" : ""}>
                  <IconButton color="primary" href={`/edit/blog/${id}`}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={handleDeleteBlog}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <IconButton
                  aria-label="like"
                  color="primary"
                  onClick={handleLike}
                >
                  <Badge
                    badgeContent={blog.like}
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
                    badgeContent={blog.dislike}
                    color="secondary"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <ThumbDownIcon />
                  </Badge>
                </IconButton>
              </Box>
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
              <MUIRichTextEditor
                defaultValue={blog.content}
                readOnly={true}
                toolbar={false}
              />
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >{`Posted by ${blog.authorFirstName} ${blog.authorLastName}`}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {moment(blog.createdAt.toDate()).calendar()}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
      <Comments credential={credential} blogID={id} theme={theme} />
      <CreateComment blogID={id} theme={theme} />
    </Container>
  );
};

export default Blog;
