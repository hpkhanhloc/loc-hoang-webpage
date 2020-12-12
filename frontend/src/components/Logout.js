import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "../styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../actions/authAction";

const Logout = () => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logOut());
    history.push("/");
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
