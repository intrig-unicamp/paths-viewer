import { FunctionComponent } from "react";
import { IFile } from "../../components/App/App";
import FilesSelectionContainer from "../../components/FilesSelectionContainer/FilesSelectionContainer";

interface FilesSelectionPageProps {
  files: IFile[];
  setFiles: (files: IFile[]) => void;
}

const FilesSelectionPage: FunctionComponent<FilesSelectionPageProps> = ({
  files,
  setFiles,
}) => <FilesSelectionContainer files={files} setFiles={setFiles} />;

export default FilesSelectionPage;
