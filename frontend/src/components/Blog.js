import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  LinearProgress,
  Divider,
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
            <Typography variant="h5">Can not find blog!</Typography>
          ) : (
            <>
              <Typography variant="h5">{blog.title}</Typography>
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
