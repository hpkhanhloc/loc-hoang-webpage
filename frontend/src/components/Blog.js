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
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { deleteBlog } from "../actions/blogActions";

const Blog = (props) => {
  const { credential } = props;
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
                <Box>
                  <Button color="primary" onClick={handleDeleteBlog}>
                    Delete
                  </Button>
                </Box>
              </Box>
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
              <Typography variant="body2">{blog.content}</Typography>
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
    </Container>
  );
};

export default Blog;
