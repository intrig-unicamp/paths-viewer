import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FilesSelectionPage from "../../pages/FilesSelection/FilesSelection";
import MapViewerPage from "../../pages/MapViewer/MapViewer";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const App: FunctionComponent = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <Header />
    <Routes>
      <Route path="/" element={<FilesSelectionPage />} />
      <Route path="/map" element={<MapViewerPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Footer />
  </Box>
);

export default App;
