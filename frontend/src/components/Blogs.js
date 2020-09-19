import React from "react";
import moment from "moment";
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
        <CardHeader
          title={blog.title}
          subheader={`Posted by ${blog.authorFirstName} ${
            blog.authorLastName
          } - ${moment(blog.createdAt.toDate()).calendar()}`}
        />
        <CardContent>
          <Typography variant="body2">
            {blog.content.substring(0, 500) + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={`/blog/${blog.id}`}>
            Read more
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Blogs;
