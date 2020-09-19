import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PostAddIcon from "@material-ui/icons/PostAdd";

const Notifications = () => {
  useFirestoreConnect([
    {
      collection: "notifications",
      orderBy: ["time", "desc"],
      limit: 10,
    },
  ]);
  const notifications = useSelector(
    (state) => state.firestore.ordered.notifications
  );
  return (
    <Paper>
      <Box pt={2} pl={2}>
        <Typography variant="h6">Notifications</Typography>
      </Box>
      <List pt={-2}>
        {notifications &&
          notifications.map((notification) => {
            return (
              <ListItem key={notification.id} alignItems="flex-start">
                <ListItemIcon>
                  {notification.type === "user" ? (
                    <PersonAddIcon />
                  ) : (
                    <PostAddIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="body1"
                        color="primary"
                        display="inline"
                      >
                        {`${notification.user} `}
                      </Typography>
                      <Typography variant="body1" display="inline">
                        {notification.content}
                      </Typography>
                    </>
                  }
                  secondary={moment(notification.time.toDate()).fromNow()}
                />
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
};

export default Notifications;
