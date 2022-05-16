import { Delete, Send } from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  List,
  ListItem,
  ListSubheader,
  Paper,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Papa from "papaparse";
import { ChangeEvent, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { IFile } from "../App/App";
import ColorPicker, { Colors } from "../ColorPicker/ColorPicker";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import "./FilesSelectionContainer.css";

interface FilesSelectionContainerProps {
  files: IFile[];
  setFiles: (files: IFile[]) => void;
}

const FilesSelectionContainer: FunctionComponent<
  FilesSelectionContainerProps
> = ({ files, setFiles }) => {
  const getRandomColor = (): string => {
    const colors = Object.keys(Colors);
    const index = Math.floor(Math.random() * colors.length) + 1;
    const key = colors[index];

    return Colors[key];
  };

  const parseFileData = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const filesList = [...files];
        filesList.push({
          filename: file.name,
          color: getRandomColor(),
          data,
        });
        setFiles(filesList);
      },
      error: (error) => console.error(error),
    });
  };

  const onSelectFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = evt?.target?.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const file = selectedFiles[0];
    if (file.type !== "text/csv") {
      throw new Error("Only CSV files are allowed");
    } else {
      parseFileData(file);
    }
  };

  const onRemoveFile = (index: number) => {
    const filesList = [...files];
    filesList.splice(index, 1);
    setFiles(filesList);
  };

  const onChangeColor = (index: number, evt: SelectChangeEvent) => {
    const selectedColor = evt?.target?.value;

    if (!selectedColor) {
      return;
    }

    const filesList = [...files];
    filesList[index].color = selectedColor;
    setFiles(filesList);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ my: 2, p: 1 }}>
        <Typography component="h1" variant="h4" align="center">
          To start, select up to 5 CSV files with paths to render.
        </Typography>

        <Stack direction="row" spacing={1} className="buttons-stack">
          {files.length < 5 && (
            <FileUploadButton
              variant={files.length === 0 ? "contained" : "outlined"}
              onSelectFile={onSelectFile}
            />
          )}
          {files.length > 0 && (
            <Link to="/map">
              <Button variant="contained" size="small" endIcon={<Send />}>
                {" "}
                View paths on map{" "}
              </Button>
            </Link>
          )}
        </Stack>

        {files.length > 0 && (
          <List>
            <ListSubheader>Selected files</ListSubheader>
            {files.map(({ filename, color }, index) => (
              <ListItem key={index} sx={{ pb: 0 }}>
                <Chip
                  className="filename-item-content"
                  variant="outlined"
                  color="secondary"
                  label={<Typography noWrap>{filename}</Typography>}
                  onDelete={() => onRemoveFile(index)}
                  deleteIcon={<Delete fontSize="small" />}
                />
                <ColorPicker
                  selectedColor={color}
                  onChangeColor={(evt) => onChangeColor(index, evt)}
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
