import React from "react";
import { useHistory, Link } from "react-router-dom";
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

const Blogs = () => {
  useFirestoreConnect([{ collection: "blogs" }]);
  const blogs = useSelector((state) => state.firestore.ordered.blogs);

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
  const history = useHistory();

  const handleOnClick = (event) => {
    history.push(`/blog/${blog.id}`);
  };

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
          <Button size="small" onClick={handleOnClick}>
            Read more
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Blogs;
