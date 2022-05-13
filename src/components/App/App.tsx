import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import FilesSelectionPage from "../../pages/FilesSelection/FilesSelection";
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
    <FilesSelectionPage />
    <Footer />
  </Box>
);

export default App;
