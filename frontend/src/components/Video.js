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
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { storage } from "../config/fbConfig";
import { setAlert } from "../actions/alertActions";

const MAX_LIMIT_PREDICT_SECOND = 20;

const Video = (props) => {
  const { credential, profile } = props;
  const id = useParams().id;
  useFirestoreConnect([`/videos/${id}`]);
  const video = useSelector(
    ({ firestore: { data } }) => data.videos && data.videos[id]
  );
  const [url, setURL] = useState();
  const [intro, setIntro] = useState();

  const ref = useRef(null);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (url) predictIntro(url);
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

  const predictIntro = async (url) => {
    return new Promise(async (resolve, reject) => {
      const start = new Date().getTime();
      const video = document.createElement("video");
      const videoBlob = await fetch(url)
        .then((res) => res.blob())
        .catch((err) =>
          reject(
            dispatch(
              setAlert({
                alert: true,
                severity: "error",
                alertMessage: `Prediction failed because of  ${err}`,
              })
            )
          )
        );
      const videoURL = URL.createObjectURL(videoBlob);
      const canvas = canvasRef.current;
      let seekResolve;

      const loadModel = async () => {
        const model = await tf.loadLayersModel("/assets/model/model.json");
        return model;
      };

      const model = await loadModel();

      video.addEventListener("seeked", async () => {
        if (seekResolve) seekResolve();
      });

      const predictedClass = (image) =>
        tf.tidy(() => {
          const prediction = model.predict(image).dataSync();
          return prediction;
        });

      video.addEventListener("loadeddata", async () => {
        const context = canvas.getContext("2d");
        let currentTime = 0;

        while (currentTime < MAX_LIMIT_PREDICT_SECOND) {
          video.currentTime = currentTime;
          await new Promise((r) => (seekResolve = r));

          context.drawImage(video, 0, 0, 150, 150);
          const imageData = context.getImageData(0, 0, 150, 150);
          const imageTensor = tf.browser.fromPixels(imageData);
          // reshape tensor
          const resizedImage = tf
            .reshape(imageTensor, [150, 150, 3])
            .expandDims();
          const classID = await predictedClass(resizedImage);
          if (classID[0] === 1) {
            setIntro(currentTime);
            break;
          }
          currentTime++;
        }
        const end = new Date().getTime();
        video.currentTime = 0;
        resolve(
          dispatch(
            setAlert({
              alert: true,
              severity: "info",
              alertMessage: `Prediction finnished in ${
                (end - start) / 1000
              } seconds`,
            })
          )
        );
      });
      video.src = videoURL;
    });
  };

  if (isLoaded(video) && !isEmpty(video)) {
    loadURL();
  }

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
              <Typography variant="body2">
                Note: Not working in mobile device. In addtion, low disk space
                can prevent browser start prediction.
              </Typography>
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
