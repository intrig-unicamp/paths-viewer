import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import DynamicModeContainer from "../../components/DynamicModeContainer/DynamicModeContainer";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { create, selectSession } from "../../features/sessions/slice";

const DynamicModePage: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const { query } = router;
    if (query.sessionId) {
      dispatch(create(String(query.sessionId)));
      setSessionId(String(query.sessionId));
    } else if (!!session.id) {
      setSessionId(session.id);
    }
  }, [router, session]);

  if (!sessionId) {
    return <p>Session not initialized or not found. Go back to main page.</p>;
  }

  return <DynamicModeContainer sessionId={String(sessionId) ?? ""} />;
};

export default DynamicModePage;

export async function getStaticProps() {
  return {
    props: {
      title: `Session on Dynamic Mode`,
    },
  };
}
