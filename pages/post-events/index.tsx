import { FunctionComponent } from "react";
import FilesSelectionContainer from "../../components/FilesSelectionContainer/FilesSelectionContainer";

const FilesSelectionPage: FunctionComponent = () => {
  return <FilesSelectionContainer />;
};

export default FilesSelectionPage;

export async function getStaticProps() {
  return {
    props: {
      title: "Post Events Mode",
    },
  };
}
