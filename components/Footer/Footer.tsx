import { Box, Link } from "@mui/material";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => (
  <Box component="footer">
    Made by{" "}
    {
      <Link
        href="https://github.com/williamquintas/paths-viewer"
        target="_blank"
      >
        William Quintas de Melo
      </Link>
    }
  </Box>
);

export default Footer;
