import React, { useRef, useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";
import { MuiThemeProvider } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";

import UploadImagePopover from "./UploadImagePopover";
import { uploadImage } from "./UploadImagePopover";
import { darkTheme, lightTheme } from "../styles";

const TextEditor = (props) => {
  const ref = useRef(null);
  const [anchor, setAnchor] = useState(null);

  const handleFileUpload = (file) => {
    ref.current.insertAtomicBlockAsync(
      "IMAGE",
      uploadImage(file),
      "Uploading now..."
    );
  };

  const handleOnChange = (prop) => (event) => {
    props.setContent({
      ...props.content,
      [prop]: JSON.stringify(convertToRaw(event.getCurrentContent())),
    });
  };

  return (
    <MuiThemeProvider theme={props.theme ? lightTheme : darkTheme}>
      <UploadImagePopover
        anchor={anchor}
        onSubmit={(data, insert) => {
          if (insert && data.file) {
            handleFileUpload(data.file);
          }
          setAnchor(null);
        }}
      />
      <MUIRichTextEditor
        defaultValue={props.content.content}
        toolbar={props.toolbar}
        readOnly={props.readOnly ? props.readOnly : false}
        ref={ref}
        controls={[
          "title",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "highlight",
          "undo",
          "redo",
          "link",
          "media",
          "numberList",
          "bulletList",
          "quote",
          "code",
          "upload-image",
        ]}
        customControls={[
          {
            name: "upload-image",
            icon: <BackupIcon />,
            type: "callback",
            onClick: (_editorState, _name, anchor) => {
              setAnchor(anchor);
            },
          },
        ]}
        draftEditorProps={{
          handleDroppedFiles: (_selectionState, files) => {
            if (files.length && files[0].name !== undefined) {
              handleFileUpload(files[0]);
              return "handled";
            }
            return "not-handled";
          },
        }}
        onChange={handleOnChange("content")}
        border={props.border ? "1px solid grey" : ""}
        minHeight={props.minHeight ? props.minHeight : 0}
      />
    </MuiThemeProvider>
  );
};

export default TextEditor;
