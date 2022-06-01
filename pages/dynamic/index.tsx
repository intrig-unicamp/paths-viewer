import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import DynamicModeContainer from "../../components/DynamicModeContainer/DynamicModeContainer";

const DynamicModePage: FunctionComponent = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  if (!sessionId) {
    return null;
  }

  return <DynamicModeContainer sessionId={String(sessionId) ?? ""} />;
};

export default DynamicModePage;
