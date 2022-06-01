import { Container, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const Custom404Page: FunctionComponent = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ my: 2, p: 1 }}>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          sx={{ pb: 1, fontWeight: "bold" }}
        >
          404: Page not found!
        </Typography>
      </Paper>
    </Container>
  );
};
export default Custom404Page;
