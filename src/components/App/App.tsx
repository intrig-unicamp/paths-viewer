import { Box } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FilesSelectionPage from "../../pages/FilesSelection/FilesSelection";
import MapViewerPage from "../../pages/MapViewer/MapViewer";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export interface IFile {
  filename: string;
  color: string;
  data?: {
    date?: string;
    time?: string;
    id?: string;
    line?: string;
    latitude?: string;
    longitude?: string;
    speed?: string;
  }[];
}

const App: FunctionComponent = () => {
  const [files, setFiles] = useState<IFile[]>([]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Routes>
        <Route
          path="/"
          element={<FilesSelectionPage files={files} setFiles={setFiles} />}
        />
        <Route path="/map" element={<MapViewerPage files={files} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
