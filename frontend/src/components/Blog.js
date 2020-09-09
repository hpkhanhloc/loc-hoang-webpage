import React from "react";
import { useParams, withRouter } from "react-router-dom";
import { Container, Paper, Box, Typography } from "@material-ui/core";
import { useStyles } from "../styles";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const Blog = () => {
  const id = useParams().id;
  console.log(id);
  useFirestoreConnect([`/blogs/${id}`]);
  const blog = useSelector(
    ({ firestore: { data } }) => data.blogs && data.blogs[id]
  );
  const classes = useStyles()();
  return (
    <Container>
      <Paper>
        <Box p={2}>
          <Typography variant="h6">{blog.title}</Typography>
          <Typography variant="body2">{blog.content}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default withRouter(Blog);
