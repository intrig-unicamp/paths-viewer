import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import RealTimeModeContainer from "../../components/RealTimeModeContainer/RealTimeModeContainer";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { createSession, selectSession } from "../../features/sessions/slice";

const RealTimeModePage: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const { query } = router;
    if (query.sessionId) {
      dispatch(createSession(String(query.sessionId)));
      setSessionId(String(query.sessionId));
    } else if (!!session.id) {
      setSessionId(session.id);
    }
  }, [router, session]);

  if (!sessionId) {
    return <p>Session not initialized or not found. Go back to main page.</p>;
  }

  return <RealTimeModeContainer sessionId={String(sessionId) ?? ""} />;
};

export default RealTimeModePage;

export async function getStaticProps() {
  return {
    props: {
      title: "Session on Real Time Mode",
    },
  };
}
