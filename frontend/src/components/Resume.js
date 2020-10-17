import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Box, Button } from "@material-ui/core";
import CVPart from "./CVPart";
import { createContent } from "../actions/cvAction";
import { convertToRaw, EditorState } from "draft-js";

const Resume = (props) => {
  const { credential, theme } = props;
  const dispatch = useDispatch();

  useFirestoreConnect([{ collection: "cv", orderBy: ["createdAt", "desc"] }]);
  const cvParts = useSelector((state) => state.firestore.ordered.cv);

  const handleCreateEmptyCVPart = (event) => {
    event.preventDefault();
    console.log("Create new paragraph");
    dispatch(
      createContent({
        content: JSON.stringify(
          convertToRaw(EditorState.createEmpty().getCurrentContent())
        ),
      })
    );
  };

  return (
    <Box mt={-2}>
      {credential.uid && (
        <Box mr={4} display="flex" justifyContent="flex-end">
          <Button color="primary" onClick={handleCreateEmptyCVPart}>
            Add paragraph
          </Button>
        </Box>
      )}
      {cvParts &&
        cvParts.map((cvPart) => {
          return (
            <Box m={2} key={cvPart.id}>
              <CVPart credential={credential} cvPart={cvPart} theme={theme} />
            </Box>
          );
        })}
    </Box>
  );
};

export default Resume;
