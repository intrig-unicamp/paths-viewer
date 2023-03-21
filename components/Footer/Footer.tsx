import { Box, Link } from "@mui/material";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => (
  <Box component="footer">
    Made by{" "}
    {
      <Link
        href="https://github.com/intrig-unicamp/paths-viewer"
        target="_blank"
      >
        INTRIG Research Group
      </Link>
    }
  </Box>
);

export default Footer;
