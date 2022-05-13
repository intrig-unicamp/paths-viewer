import { AppBar, Toolbar, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import LogoIcon from "../Logo/Logo";
import "./Header.css";

const Header: FunctionComponent = () => (
  <div>
    <AppBar position="relative" color="transparent">
      <Toolbar>
        <LogoIcon className="logo-icon" />
        <Typography variant="h1">Paths viewer</Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
