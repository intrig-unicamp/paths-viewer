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
  createEntity,
  deleteEntity,
  editEntity,
  selectEntities,
} from "../../features/sessions/slice";
import ColorPicker, { Colors } from "../ColorPicker/ColorPicker";
import FileUploadButton from "../FileUploadButton/FileUploadButton";
import Link from "../Link/Link";

const FilesSelectionContainer: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const entities = useAppSelector(selectEntities);

  const getRandomColor = (): string => {
    const colors = Object.keys(Colors);
    const index = Math.floor(Math.random() * colors.length);
    const key = colors[index];

    return Colors[key];
  };

  const parseFileData = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        dispatch(
          createEntity({
            id: file.name,
            color: getRandomColor(),
            coordinates: data,
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

  const onRemoveFile = (id: string) => {
    dispatch(deleteEntity(id));
  };

  const onChangeColor = (id: string, evt: SelectChangeEvent) => {
    const selectedColor = evt?.target?.value;

    if (!selectedColor) {
      return;
    }

    dispatch(editEntity({ id, color: selectedColor }));
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
          {entities.length < 5 && (
            <FileUploadButton
              variant={entities.length === 0 ? "contained" : "outlined"}
              onSelectFile={onSelectFile}
            />
          )}
          {entities.length > 0 && (
            <Link href="/static/map">
              <Button variant="contained" size="small" endIcon={<Send />}>
                {" "}
                View paths on map{" "}
              </Button>
            </Link>
          )}
        </Stack>

        {entities.length > 0 && (
          <List>
            <ListSubheader>Selected entities</ListSubheader>
            {entities.map(({ id, color }, index) => (
              <ListItem key={index} sx={{ pb: 0 }}>
                <Chip
                  className="filename-item-content"
                  variant="outlined"
                  color="secondary"
                  label={<Typography noWrap>{id}</Typography>}
                  onDelete={() => onRemoveFile(id)}
                  deleteIcon={<Delete fontSize="small" />}
                />
                <ColorPicker
                  selectedColor={color}
                  onChangeColor={(evt) => onChangeColor(id, evt)}
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
