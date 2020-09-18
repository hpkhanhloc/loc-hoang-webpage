import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const Blog = (props) => {
  const { credential } = props;
  const id = useParams().id;
  useFirestoreConnect([`/blogs/${id}`]);
  const blog = useSelector(
    ({ firestore: { data } }) => data.blogs && data.blogs[id]
  );
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
            <Typography variant="h6">Can not find blog!</Typography>
          ) : (
            <>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography variant="body2">{blog.content}</Typography>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Blog;
