import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
  Box,
  Button,
  Container,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  CardMedia,
  Grid,
  Link,
} from "@material-ui/core";
import CVPart from "./CVPart";
import { createContent } from "../actions/cvActions";
import { convertToRaw, EditorState } from "draft-js";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PythonLogo from "../static/images/python_logo.png";
import JSLogo from "../static/images/js_logo.png";
import ReactLogo from "../static/images/react_logo.png";
import NodeJSLogo from "../static/images/nodejs_logo.png";
import FirebaseLogo from "../static/images/firebase_logo.png";
import MongoDBLogo from "../static/images/mongodb_logo.png";
import GraphQLLogo from "../static/images/graphql_logo.png";

const Resume = (props) => {
  const { credential, profile, theme } = props;
  const dispatch = useDispatch();

  useFirestoreConnect([{ collection: "cv", orderBy: ["createdAt", "desc"] }]);
  const cvParts = useSelector((state) => state.firestore.ordered.cv);
  const [certificateExpand, setCertificateExpand] = useState(false);

  const logos = [
    PythonLogo,
    JSLogo,
    ReactLogo,
    NodeJSLogo,
    FirebaseLogo,
    MongoDBLogo,
    GraphQLLogo,
  ];

  const handleCreateEmptyCVPart = (title) => (event) => {
    event.preventDefault();
    dispatch(
      createContent({
        title: title,
        content: JSON.stringify(
          convertToRaw(EditorState.createEmpty().getCurrentContent())
        ),
      })
    );
  };

  const ListItemWithIconAndText = (props) => {
    return (
      <ListItem style={{ padding: 0 }}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText
          primary={<Typography variant="body1">{props.text}</Typography>}
        />
      </ListItem>
    );
  };

  return (
    <Container>
      <Paper>
        <Box p={2}>
          <Box m={4} p={2} border="1px solid grey" borderRadius={5}>
            <Typography variant="h5">Loc Hoang</Typography>
            <Typography variant="subtitle1">Software Developer</Typography>
            <ListItemWithIconAndText
              icon={<EmailIcon />}
              text="hpkhanhloc@gmail.com"
            />
            <ListItemWithIconAndText
              icon={<HomeIcon />}
              text="Helsinki, Finland"
            />
            <ListItemWithIconAndText
              icon={<LinkedInIcon />}
              text={
                <Link
                  href="https://www.linkedin.com/in/loc-hoang-2a3820152/"
                  target="_blank"
                  color="primary"
                >
                  https://www.linkedin.com/in/loc-hoang-2a3820152
                </Link>
              }
            />
            <ListItemWithIconAndText
              icon={<GitHubIcon />}
              text={
                <Link
                  href="https://github.com/hpkhanhloc"
                  target="_blank"
                  color="primary"
                >
                  https://github.com/hpkhanhloc
                </Link>
              }
            />
          </Box>
          <Box m={4} p={2} border="1px solid grey" borderRadius={5}>
            <Typography variant="h6">
              Programing Languages & Frameworks
            </Typography>
            <Divider />
            <Grid container direction="row">
              {logos.map((logo) => (
                <Grid item xs key={logos.indexOf(logo)}>
                  <CardMedia
                    style={{
                      height: 50,
                      width: "auto",
                      marginTop: 16,
                      marginLeft: 16,
                      display: "inline",
                    }}
                    component="img"
                    src={logo}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box m={4} p={2} border="1px solid grey" borderRadius={5}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography variant="h6">Certificates</Typography>
              </Box>
              <Box>
                <Button
                  color="primary"
                  onClick={() => setCertificateExpand(!certificateExpand)}
                >
                  Show
                </Button>
              </Box>
              {credential.uid && profile.role === "owner" && (
                <Button
                  color="primary"
                  onClick={handleCreateEmptyCVPart("certificate")}
                >
                  Add paragraph
                </Button>
              )}
            </Box>
            {cvParts &&
              certificateExpand &&
              cvParts
                .filter((cvPart) => cvPart.title === "certificate")
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((filtered) => (
                  <Box key={filtered.id}>
                    <Divider />
                    <CVPart
                      credential={credential}
                      profile={profile}
                      cvPart={filtered}
                      theme={theme}
                    />
                  </Box>
                ))}
          </Box>
          <Box m={4} p={2} border="1px solid grey" borderRadius={5}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography variant="h6">Experience and Projects</Typography>
              </Box>
              {credential.uid && profile.role === "owner" && (
                <Button
                  color="primary"
                  onClick={handleCreateEmptyCVPart("experience")}
                >
                  Add paragraph
                </Button>
              )}
            </Box>
            {cvParts &&
              cvParts
                .filter((cvPart) => cvPart.title === "experience")
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((filtered) => (
                  <Box key={filtered.id}>
                    <Divider />
                    <CVPart
                      credential={credential}
                      profile={profile}
                      cvPart={filtered}
                      theme={theme}
                    />
                  </Box>
                ))}
          </Box>
          <Box m={4} p={2} border="1px solid grey" borderRadius={5}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography variant="h6">Education</Typography>
              </Box>
              {credential.uid && profile.role === "owner" && (
                <Button
                  color="primary"
                  onClick={handleCreateEmptyCVPart("education")}
                >
                  Add paragraph
                </Button>
              )}
            </Box>
            {cvParts &&
              cvParts
                .filter((cvPart) => cvPart.title === "education")
                .map((filtered) => (
                  <Box key={filtered.id}>
                    <Divider />
                    <CVPart
                      credential={credential}
                      profile={profile}
                      cvPart={filtered}
                      theme={theme}
                    />
                  </Box>
                ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Resume;
