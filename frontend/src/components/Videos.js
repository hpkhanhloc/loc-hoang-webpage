import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
} from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const Videos = (props) => {
  const { credential } = props;
  useFirestoreConnect([{ collection: "videos" }]);
  const videos = useSelector((state) => state.firestore.ordered.videos);

  if (!credential.uid) {
    return <Redirect to="/" />;
  }
  console.log(videos);

  return (
    <Box m={2}>
      {videos &&
        videos.map((video) => {
          return (
            <Card key={video.id}>
              <CardActionArea>
                <CardMedia image={video.thumb} style={{ height: 200 }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {video.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {video.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={`/video/${video.id}`}
                >
                  Play
                </Button>
              </CardActions>
            </Card>
          );
        })}
    </Box>
  );
};

export default Videos;
