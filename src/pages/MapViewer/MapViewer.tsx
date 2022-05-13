import { ArrowBack } from "@mui/icons-material";
import { Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

const MapViewerPage: FunctionComponent = () => {
  const navigate = useNavigate();
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
      </Paper>
    </Container>
  );
};

export default MapViewerPage;
