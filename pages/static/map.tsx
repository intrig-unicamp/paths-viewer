import { ArrowBack } from "@mui/icons-material";
import { Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import MapContainer from "../../components/MapContainer/MapContainer";
import { useAppSelector } from "../../config/hooks";
import { selectEntities } from "../../features/sessions/slice";

const MapViewerPage: FunctionComponent = () => {
  const router = useRouter();
  const entities = useAppSelector(selectEntities);

  useEffect(() => {
    if (!entities || entities.length === 0) {
      router.push("/static");
    }
  }, [entities]);

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
        <MapContainer />
      </Paper>
    </Container>
  );
};

export default MapViewerPage;

export async function getStaticProps() {
  return {
    props: {
      title: "Map on Static Mode",
    },
  };
}
