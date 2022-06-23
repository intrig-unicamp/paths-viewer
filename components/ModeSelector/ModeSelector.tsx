import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, FunctionComponent } from "react";
import { useAppDispatch } from "../../config/hooks";
import { createSession, updateEntities } from "../../features/sessions/slice";
import SessionService from "../../services/SessionService";
import Link from "../Link/Link";

const ModeSelector: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlePostEventsModeButtonClick = async () => {
    dispatch(updateEntities([]));
    router.push(`/post-events`);
  };

  const handleRealtimeModeButtonClick = async () => {
    const id = await SessionService.create();
    dispatch(createSession(id));
    dispatch(updateEntities([]));
    router.push(`/real-time?sessionId=${id}`);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ my: 2, p: 1 }}>
        <SelectorHeader />
        <Stack
          spacing={1}
          sx={{ display: "flex", alignItems: "center", my: 2 }}
        >
          <ModeCard
            href="/post-events"
            onButtonClick={handlePostEventsModeButtonClick}
            buttonText="Post events"
            description="You can load CSV files with coordinates to display on map."
          />
          <ModeCard
            href="/real-time"
            onButtonClick={handleRealtimeModeButtonClick}
            buttonText="Real time"
            description="Start a monitoring session and receive devices coordinates via API to display on map."
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default ModeSelector;

const SelectorHeader: FunctionComponent = () => (
  <Fragment>
    <Typography
      component="h1"
      variant="h1"
      align="center"
      sx={{ pb: 1, fontWeight: "bold" }}
    >
      Welcome to Paths viewer!
    </Typography>
    <Typography component="span" variant="body2" sx={{ px: 1 }}>
      To start, select which type of operation mode do you need.
    </Typography>
  </Fragment>
);

interface ModeCardProps {
  href?: string;
  onButtonClick?: () => void;
  buttonText: string;
  description: string;
}

const ModeCard: FunctionComponent<ModeCardProps> = ({
  href = "",
  onButtonClick,
  buttonText,
  description,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "80%",
        py: 2,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {onButtonClick ? (
        <Button variant="contained" onClick={onButtonClick}>
          {" "}
          {buttonText}{" "}
        </Button>
      ) : (
        <Link href={href}>
          <Button variant="contained"> {buttonText} </Button>
        </Link>
      )}

      <Typography sx={{ px: 1, my: 2 }} align="center" variant="caption">
        {description}
      </Typography>
    </Paper>
  );
};
