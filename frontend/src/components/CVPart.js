import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import TextEditor from "./TextEditor";
import { updateContent } from "../actions/cvAction";

const CVPart = (props) => {
  const { credential, profile, cvPart, theme } = props;
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
    <Box>
      {credential.uid && profile?.role === "owner" && (
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
        minHeight={edit ? 200 : 0}
      />
    </Box>
  );
};

export default CVPart;
