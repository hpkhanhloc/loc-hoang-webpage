import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Paper, Box, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import TextEditor from "./TextEditor";
import { updateContent } from "../actions/cvAction";

const CVPart = (props) => {
  const { credential, cvPart, theme } = props;
  const [editedContent, setEditedContent] = useState({ content: "" });
  const [edit, setEdit] = useState(false);
  useFirestoreConnect([`/cv`]);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnEdit = (event) => {
    event.preventDefault();
    setEdit(true);
  };

  const handleOnSave = (event) => {
    event.preventDefault();
    dispatch(updateContent(cvPart.id, editedContent));
    setEdit(false);
    history.push(`/`);
  };

  const handleOnCancel = () => {
    window.location.reload();
  };

  return (
    <Container>
      <Paper>
        <Box p={2}>
          {credential.uid && (
            <Box display="flex" justifyContent="flex-end">
              {edit ? (
                <>
                  <Button color="secondary" onClick={handleOnCancel}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleOnSave}>
                    Save
                  </Button>
                </>
              ) : (
                <Button color="primary" onClick={handleOnEdit}>
                  Edit
                </Button>
              )}
            </Box>
          )}
          <TextEditor
            content={cvPart}
            setContent={setEditedContent}
            toolbar={edit}
            readOnly={!edit}
            theme={theme}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default CVPart;
