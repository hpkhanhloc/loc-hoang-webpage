import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import UploadVideoPopup from "./UploadVideoPopup";
import { setAlert } from "../actions/alertActions";

const Videos = (props) => {
  const { credential, profile } = props;
  useFirestoreConnect([{ collection: "videos" }]);
  const videos = useSelector((state) => state.firestore.ordered.videos);
  const dispatch = useDispatch();

  if (!credential.uid || profile.role !== "owner") {
    dispatch(
      setAlert({
        alert: true,
        severity: "warning",
        alertMessage:
          "Access denied! You have not logged in or have not permission to view this content.",
      })
    );
    return <Redirect to="/" />;
  }

  return (
    <Box pr={3}>
      <Box
        display={profile.role === "owner" ? "flex" : "none"}
        justifyContent="flex-end"
      >
        <UploadVideoPopup />
      </Box>
      {videos &&
        videos.map((video) => {
          return (
            <Box mb={3} key={video.id}>
              <Card>
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
            </Box>
          );
        })}
    </Box>
  );
};

export default Videos;
