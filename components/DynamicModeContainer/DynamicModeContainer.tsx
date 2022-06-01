import { Container, Paper, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface DynamicModeContainerProps {
  sessionId: string;
}

const DynamicModeContainer: FunctionComponent<DynamicModeContainerProps> = ({
  sessionId,
}) => {
  return (
    <Container component="main" maxWidth="lg">
      <Paper sx={{ my: 2, p: 1 }}>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          sx={{ pb: 1, fontWeight: "bold" }}
        >
          Dynamic Mode
        </Typography>
        <Typography component="span" variant="body2" sx={{ px: 1 }}>
          {`Session ID: ${sessionId}`}
        </Typography>
      </Paper>
    </Container>
  );
};

export default DynamicModeContainer;
