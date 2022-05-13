import { InsertDriveFile } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { ChangeEvent, Fragment, FunctionComponent } from "react";
import "./FileUploadButton.css";

interface IFileUploadButtonProps {
  onSelectFile: (evt: ChangeEvent<HTMLInputElement>) => void;
  variant: "contained" | "outlined";
}

const FileUploadButton: FunctionComponent<IFileUploadButtonProps> = ({
  onSelectFile,
  variant,
}) => (
  <Fragment>
    <label htmlFor="upload-button">
      <input
        accept=".csv"
        id="upload-button"
        type="file"
        onChange={onSelectFile}
      />
      <Button
        size="small"
        variant={variant}
        component="span"
        endIcon={<InsertDriveFile />}
      >
        Add file
      </Button>
    </label>
  </Fragment>
);

export default FileUploadButton;
