import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import ModeSelector from "../components/ModeSelector/ModeSelector";

const IndexPage: FunctionComponent = () => {
  const router = useRouter();

  return <ModeSelector />;
};

export default IndexPage;
