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
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import {
  add,
  changeColor,
  remove,
  selectFiles,
} from "../../features/files/slice";
import ColorPicker, { Colors } from "../ColorPicker/ColorPicker";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import Link from "../Link/Link";

const FilesSelectionContainer: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);

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
        dispatch(
          add({
            filename: file.name,
            color: getRandomColor(),
            data,
          })
        );
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
    dispatch(remove(index));
  };

  const onChangeColor = (index: number, evt: SelectChangeEvent) => {
    const selectedColor = evt?.target?.value;

    if (!selectedColor) {
      return;
    }

    dispatch(changeColor({ index, color: selectedColor }));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ my: 2, p: 1 }}>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          sx={{ pb: 1, fontWeight: "bold" }}
        >
          Static Mode
        </Typography>
        <Typography component="span" variant="body2" sx={{ px: 1 }}>
          To start, select up to 5 CSV files with paths to render.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          className="buttons-stack"
          sx={{ my: 2 }}
        >
          {files.length < 5 && (
            <FileUploadButton
              variant={files.length === 0 ? "contained" : "outlined"}
              onSelectFile={onSelectFile}
            />
          )}
          {files.length > 0 && (
            <Link href="/static/map">
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
