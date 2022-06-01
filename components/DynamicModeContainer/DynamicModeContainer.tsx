import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Card,
  Collapse,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Fragment, FunctionComponent, useState } from "react";

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
        <HelpCard sessionId={sessionId} />
      </Paper>
    </Container>
  );
};

export default DynamicModeContainer;

const HelpCard: FunctionComponent<{ sessionId: string }> = ({ sessionId }) => {
  const [open, setOpen] = useState<boolean>(false);

  const sections = [
    {
      title: "Endpoint",
      content: `POST  http://localhost:3000/api/session/${sessionId}`,
    },
    {
      title: "POST Body Model",
      content: JSON.stringify(
        {
          id: "string",
          date: "string (YYYY-MM-DD)",
          time: "string (HH:MM:SS)",
          latitude: "number",
          longitude: "number",
          speed: "number",
        },
        null,
        4
      ),
    },
    {
      title: "Example Request",
      content: `curl -X POST \\
    --header "Content-Type: application/json" \\
    --data '{ "id":"SOME_ID", "date": "2022-01-01", "time": "23:59:59", "longitude": -22.6934614, "latitude": -47.5207821, "speed": 42.1 }' \\
    http://localhost:3000/api/session/${sessionId}`,
    },
  ];

  return (
    <Card sx={{ p: 2, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component="span" variant="body2">
          You can now make HTTP requests with coordinates data to see it on map.
        </Typography>
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
          sx={{ backgroundColor: "#f1f3f5" }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {sections.map(({ title, content }) => (
          <Fragment>
            <Typography component="h2" variant="h2" sx={{ mt: 1 }}>
              {title}
            </Typography>

            <Typography
              component="pre"
              variant="caption"
              sx={{
                p: 1,
                mt: 0.5,
                borderRadius: 1,
                backgroundColor: grey[400],
                width: "100%",
              }}
            >
              {content}
            </Typography>
          </Fragment>
        ))}
      </Collapse>
    </Card>
  );
};
