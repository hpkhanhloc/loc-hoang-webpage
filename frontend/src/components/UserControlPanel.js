import React, { useState } from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../actions/alertAction";
import { useStyles } from "../styles";
import { getFirebase } from "react-redux-firebase";

const UserControlPanel = (props) => {
  const { credential, profile } = props;
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newPassword, setNewPassword] = useState();
  const [retypePassword, setRetypePassword] = useState();
  const userID = useParams().id;
  const classes = useStyles()();
  const dispatch = useDispatch();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  const handleUpdateUserInfo = () => {};

  if (!credential.uid || credential.uid !== userID) {
    dispatch(
      setAlert({
        alert: true,
        severity: "warning",
        alertMessage:
          "Access denied! You have not logged in or have not permission to edit blog.",
      })
    );
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Paper>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item md={4} container justify="center" alignItems="center">
              <Box display="flex" justifyContent="center">
                <Avatar aria-label="userAvatar" className={classes.largeAvatar}>
                  {profile.initials}
                </Avatar>
              </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              style={{ marginLeft: 2 }}
              item
              md={8}
              container
              direction="column"
              spacing={2}
            >
              <Grid item container spacing={8}>
                <Grid item>
                  <TextField
                    label="First name"
                    defaultValue={profile.firstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Last name"
                    defaultValue={profile.lastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={8}>
                <Grid item>
                  <TextField
                    label="New password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Retype new password"
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={8}>
                <Grid item>
                  <TextField
                    label="Email"
                    defaultValue={profile.email}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Created at"
                    defaultValue={moment
                      .unix(credential.createdAt / 1000)
                      .format("MM/DD/YYYY")}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUserInfo}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserControlPanel;
