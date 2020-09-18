import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { useStyles } from "../styles";
import { Redirect } from "react-router-dom";

const Blogs = (props) => {
  const { credential } = props;
  useFirestoreConnect([{ collection: "blogs" }]);
  const blogs = useSelector((state) => state.firestore.ordered.blogs);

  if (!credential.uid) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {blogs &&
        blogs.map((blog) => {
          return <BlogSummary blog={blog} key={blog.id} />;
        })}
    </div>
  );
};

const BlogSummary = ({ blog }) => {
  const classes = useStyles()();

  return (
    <Container>
      <Card className={classes.blogCard}>
        <CardHeader title={blog.title} />
        <CardContent>
          <Typography variant="body2">
            {blog.content.substring(0, 250) + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={`/blog/${blog.id}`}>
            Read more
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Blogs;
