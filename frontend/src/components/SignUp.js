import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useStyles } from "../styles";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const classes = useStyles()();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("Closed");
  };
  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.id]: event.target.value,
    });
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    console.log(`Signed Up`);
    console.log(profile);
    setOpen(false);
  };
  return (
    <>
      <Button className={classes.authButton} onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SignUp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First name"
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            label="Last name"
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={handleChange}
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignUp} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
