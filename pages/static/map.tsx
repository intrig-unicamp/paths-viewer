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
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import CoordinatesList from "../../components/CoordinatesList/CoordinatesList";
import Map from "../../components/Map/Map";
import { useAppSelector } from "../../config/hooks";
import { selectFiles } from "../../features/files/slice";

const MapViewerPage: FunctionComponent = () => {
  const router = useRouter();
  const files = useAppSelector(selectFiles);

  useEffect(() => {
    if (!files || files.length === 0) {
      router.push("/static");
    }
  }, [files]);

  return (
    <Container component="main" maxWidth="lg">
      <Paper sx={{ my: 2, p: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton aria-label="go-back" onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
          <Typography component="h1" variant="h1" fontWeight="bold">
            Map
          </Typography>
        </Stack>
        <Typography component="span" variant="body2" sx={{ mx: 1 }}>
          Click on any file on the list to see its coordinates list.
        </Typography>
        <Grid container spacing={1} sx={{ my: 2 }}>
          <Grid item xs={8}>
            <Paper>
              <Map files={files} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Typography
              component="h2"
              variant="h2"
              sx={{ m: 1, fontWeight: "bold" }}
            >
              Files list
            </Typography>
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
