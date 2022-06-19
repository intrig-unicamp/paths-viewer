import { Grid, List, Paper, Typography } from "@mui/material";
import { Fragment, FunctionComponent } from "react";
import { useAppSelector } from "../../config/hooks";
import { selectSession } from "../../features/sessions/slice";
import { ICoordinatesData } from "../../models/ICoordinatesData";
import CoordinatesList from "../CoordinatesList/CoordinatesList";
import Map from "../Map/Map";

const MapContainer: FunctionComponent = () => {
  const sortOperator = (
    { date: date1, time: time1 }: ICoordinatesData,
    { date: date2, time: time2 }: ICoordinatesData
  ): number => `${date1}T${time1}` - `${date2}T${time2}`;

  const session = useAppSelector(selectSession);
  const { date, time } =
    session?.entities
      ?.map(({ coordinates }) => coordinates?.at(-1))
      ?.sort(sortOperator)
      ?.at(-1) ?? {};

  return (
    <Grid container spacing={1} sx={{ my: 2 }}>
      <Grid item xs={8}>
        <Paper>
          <Map entities={session?.entities} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        {session?.entities?.length === 0 ? (
          <Typography component="h3" variant="h3" sx={{ m: 1 }}>
            No entities found.
          </Typography>
        ) : (
          <Fragment>
            <Typography
              component="h2"
              variant="h2"
              sx={{ m: 1, fontWeight: "bold" }}
            >
              Entities list
            </Typography>
            <Paper>
              <List>
                {session?.entities?.map((entity, fileIndex) => (
                  <CoordinatesList entity={entity} key={`file-${fileIndex}`} />
                ))}
              </List>
            </Paper>
            {date && time && (
              <Typography component="p" variant="body1" sx={{ m: 1 }}>
                {`Last data timestamp: ${date}T${time}`}
              </Typography>
            )}
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
};

export default MapContainer;
