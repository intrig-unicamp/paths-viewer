import { InsertDriveFile } from "@mui/icons-material";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { ChangeEvent, FunctionComponent } from "react";
import "./FileUploadButton.css";

interface IFileUploadButtonProps {
  onSelectFile: (evt: ChangeEvent<HTMLInputElement>) => void;
  variant: "contained" | "outlined";
}

const FileUploadButton: FunctionComponent<IFileUploadButtonProps> = ({
  onSelectFile,
  variant,
}) => (
  <Container className="button-container">
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
  </Container>
);

export default FileUploadButton;
