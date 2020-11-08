import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  LinearProgress,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { storage } from "../config/fbConfig";

const Video = (props) => {
  const { credential } = props;
  const id = useParams().id;
  useFirestoreConnect([`/videos/${id}`]);
  const video = useSelector(
    ({ firestore: { data } }) => data.videos && data.videos[id]
  );
  const [url, setURL] = useState();
  const [intro, setIntro] = useState();

  const ref = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (url) predictIntro(url, 10);
  }, [url]);

  const loadURL = async () => {
    storage
      .ref("videos")
      .child(video.filename)
      .getDownloadURL()
      .then((url) => {
        setURL(url);
      })
      .catch((error) => console.log(error));
  };

  const predictIntro = async (url, maxSecond) => {
    const video = document.createElement("video");
    const videoBlob = await fetch(url).then((res) => res.blob());
    const videoURL = URL.createObjectURL(videoBlob);
    video.src = videoURL;
    const canvas = canvasRef.current;
    let seekResolve;

    const loadModel = async () => {
      const model = await tf.loadLayersModel("/assets/model/model.json");
      return model;
    };

    const model = await loadModel();

    const predictedClass = (image) =>
      tf.tidy(() => {
        const prediction = model.predict(image).dataSync();
        return prediction;
      });

    const extractFrameAndPredict = async (maxSecond) => {
      console.log("start predict");
      let i = 0;
      while (i < maxSecond) {
        console.log("predict frame", i);
        video.currentTime = i;
        await new Promise((resolve) => (seekResolve = resolve));

        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, 150, 150);
        const imageData = context.getImageData(0, 0, 150, 150);
        const imageTensor = tf.browser.fromPixels(imageData);
        // reshape tensor
        const resizedImage = tf
          .reshape(imageTensor, [150, 150, 3])
          .expandDims();
        const classID = predictedClass(resizedImage);
        console.log(classID);
        if (classID[0] === 1) {
          console.log("detected");
          setIntro(i);
          break;
        }
        i++;
      }
    };

    video.addEventListener("seeked", async () => {
      if (seekResolve) seekResolve();
    });

    video.addEventListener("loadeddata", extractFrameAndPredict(maxSecond));
  };

  if (isLoaded(video) && !isEmpty(video)) {
    loadURL();
  }

  if (!credential.uid) {
    return <Redirect to="/" />;
  }

  if (!isLoaded(video)) {
    return <LinearProgress />;
  }

  const handleSkipIntro = () => {
    ref.current.currentTime = intro;
  };

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
              <video ref={ref} src={url} controls height="100%" width="100%" />
              <Divider style={{ marginTop: 16, marginBottom: 8 }} />
            </>
          )}
        </Box>
        <Box m={2}>
          <Grid container direction="column">
            <Grid item>
              <Button
                onClick={handleSkipIntro}
                disabled={intro ? false : true}
                color="primary"
              >
                Skip intro
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="body2">{`Detected intro frame at second: ${intro} `}</Typography>
              <canvas ref={canvasRef} width={150} height={150}></canvas>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Video;
