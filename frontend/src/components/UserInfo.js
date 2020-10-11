import React from "react";
import { Avatar, Card, CardHeader, Typography } from "@material-ui/core";
import { useStyles } from "../styles";

const UserInfo = (props) => {
  const { profile } = props;
  const classes = useStyles()();

  return (
    profile && (
      <Card className={classes.card}>
        <CardHeader
          style={{ height: 64 }}
          avatar={
            <Avatar aria-label="userAvatar" className={classes.avatar}>
              {profile.initials}
            </Avatar>
          }
          title={
            <Typography variant="button" color="textPrimary">
              {`${profile.firstName} ${profile.lastName}`}
            </Typography>
          }
        />
      </Card>
    )
  );
};

export default UserInfo;
