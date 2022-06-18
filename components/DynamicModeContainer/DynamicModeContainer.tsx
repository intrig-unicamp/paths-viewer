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
import { collection, doc, onSnapshot } from "firebase/firestore";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { db } from "../../config/firebaseClient";
import { useAppDispatch } from "../../config/hooks";
import {
  appendCoordinateToEntity,
  updateEntities,
} from "../../features/sessions/slice";
import { ICoordinatesData } from "../../models/ICoordinatesData";
import { IEntity } from "../../models/IEntity";
import MapContainer from "../MapContainer/MapContainer";

interface DynamicModeContainerProps {
  sessionId: string;
}

const DynamicModeContainer: FunctionComponent<DynamicModeContainerProps> = ({
  sessionId,
}) => {
  const dispatch = useAppDispatch();

  const buildEntities = (
    entitiesData: IEntity[],
    coordinatesData: ICoordinatesData[]
  ): IEntity[] => {
    return entitiesData.map((entity) => ({
      ...entity,
      coordinates: coordinatesData.filter(({ id }) => id === entity.id),
    }));
  };

  useEffect(() => {
    if (sessionId) {
      const sessionRef = doc(db, "sessions", sessionId);
      const coordinatesRef = collection(sessionRef, "coordinates");
      const entitiesRef = collection(sessionRef, "entities");
      let coordinatesData: ICoordinatesData[] = [];

      const unsubscribeCoordinates = onSnapshot(coordinatesRef, ({ docs }) => {
        coordinatesData = docs.map((doc) => doc.data()) as ICoordinatesData[];
        const lastRecord = coordinatesData?.at(-1);
        if (lastRecord) {
          dispatch(appendCoordinateToEntity(lastRecord));
        }
      });
      const unsubscribeEntities = onSnapshot(entitiesRef, ({ docs }) => {
        const entitiesData = docs.map((doc) => doc.data()) as IEntity[];
        dispatch(updateEntities(buildEntities(entitiesData, coordinatesData)));
      });
      return () => {
        unsubscribeCoordinates();
        unsubscribeEntities();
      };
    }
  }, [sessionId]);

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
        <MapContainer />
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
      content: `curl -X POST http://localhost:3000/api/session/${sessionId} \\
    -H "Content-Type: application/json" \\
    -d '{
      "id": "SOME_ID",
      "date": "2022-01-02",
      "time": "23:59:59",
      "latitude": -22.8225099,
      "longitude": -47.075616,
      "speed": 42.1
    }'`,
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
        {sections.map(({ title, content }, index) => (
          <Fragment key={`card-${index}`}>
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
                fontFamily: "monospace",
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
