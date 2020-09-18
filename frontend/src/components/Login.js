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
import { useDispatch } from "react-redux";
import { logIn } from "../actions/authAction";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [credential, setCredential] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("Closed");
  };
  const handleChange = (event) => {
    setCredential({ ...credential, [event.target.id]: event.target.value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(logIn(credential));
    setOpen(false);
  };
  return (
    <>
      <Button className={classes.loginButton} onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
