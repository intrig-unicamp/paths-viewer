import { Delete } from "@mui/icons-material";
import {
  Chip,
  Container,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import "./FilesSelectionContainer.css";

const FilesSelectionContainer = () => {
  const [files, setFiles] = useState<string[]>([]);

  const onSelectFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = evt?.target?.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    } else {
      const filesList = [...files];
      filesList.push(selectedFiles[0].name);
      setFiles(filesList);
    }
  };

  const onRemoveFile = (index: number) => {
    const filesList = [...files];
    filesList.splice(index, 1);
    setFiles(filesList);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ my: 2, p: 1 }}>
        <Typography component="h1" variant="h4" align="center">
          To start, select up to 5 CSV files with paths to render.
        </Typography>

        {files.length < 5 && (
          <FileUploadButton
            variant={files.length === 0 ? "contained" : "outlined"}
            onSelectFile={onSelectFile}
          />
        )}

        {files.length > 0 && (
          <List>
            <ListSubheader>Selected files</ListSubheader>
            {files.map((file, index) => (
              <ListItem key={index}>
                <Chip
                  className="filename-item-content"
                  variant="outlined"
                  color="secondary"
                  label={<Typography noWrap>{file}</Typography>}
                  onDelete={() => onRemoveFile(index)}
                  deleteIcon={<Delete fontSize="small" />}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default FilesSelectionContainer;
