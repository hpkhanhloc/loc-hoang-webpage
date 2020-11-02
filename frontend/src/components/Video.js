import React, { useEffect, useState } from "react";
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
import RxPlayer from "rx-player";
import * as tf from "@tensorflow/tfjs";

const Video = (props) => {
  const { credential } = props;
  const id = useParams().id;
  useFirestoreConnect([`/videos/${id}`]);
  const video = useSelector(
    ({ firestore: { data } }) => data.videos && data.videos[id]
  );
  const [model, setModel] = useState();
  const cv = window.cv;

  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel("/assets/model/model.json");
      console.log(model.summary());
      return model;
    };
    setModel(loadModel());
  }, []);

  if (!credential.uid) {
    return <Redirect to="/" />;
  }

  if (!isLoaded(video)) {
    return <LinearProgress />;
  }

  const player = new RxPlayer({
    videoElement: document.querySelector("video"),
  });
  player.loadVideo({
    url: video.src,
    transport: "smooth",
    autoPlay: true,
  });

  console.log(cv.getBuildInformation());

  return (
    <Container>
      <Paper>
        <Box p={2}>
          {isEmpty(video) ? (
            <Typography variant="h5">Can not find video!</Typography>
          ) : (
            <>
              <Typography variant="h5">{video.title}</Typography>
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
              <video id="video" controls height="100%" width="100%" />
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Video;
