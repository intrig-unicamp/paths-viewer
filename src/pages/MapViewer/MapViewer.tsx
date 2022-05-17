import { ArrowBack } from "@mui/icons-material";
import {
  Container,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IFile } from "../../components/App/App";
import CoordinatesList from "../../components/CoordinatesList/CoordinatesList";
import Map from "../../components/Map/Map";

interface MapViewerPageProps {
  files: IFile[];
}

const MapViewerPage: FunctionComponent<MapViewerPageProps> = ({ files }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!files || files.length === 0) {
      navigate("/");
    }
  }, [files]);

  return (
    <Container component="main" maxWidth="lg">
      <Paper sx={{ my: 2, p: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton aria-label="go-back" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography component="h1" variant="h1" align="center">
            Map
          </Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Paper>
              <Map files={files} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <List>
                {files.map((file, fileIndex) => (
                  <CoordinatesList file={file} key={`file-${fileIndex}`} />
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MapViewerPage;
