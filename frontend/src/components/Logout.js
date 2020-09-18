import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "../styles";
import { useDispatch } from "react-redux";
import { logOut } from "../actions/authAction";

const Logout = () => {
  const dispatch = useDispatch();
  const classes = useStyles()();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOut());
  };
  return (
    <>
      <Button className={classes.authButton} onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Logout;
