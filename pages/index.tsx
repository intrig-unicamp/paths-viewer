import { FunctionComponent, useState } from "react";
import FilesSelectionContainer from "../components/FilesSelectionContainer/FilesSelectionContainer";
import { IFile } from "./_app";

const FilesSelectionPage: FunctionComponent = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  return <FilesSelectionContainer files={files} setFiles={setFiles} />;
};

export default FilesSelectionPage;
