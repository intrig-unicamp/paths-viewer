import { AppBar, Toolbar, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Link from "../Link/Link";
import LogoIcon from "../Logo/Logo";

const Header: FunctionComponent = () => (
  <div>
    <AppBar position="relative" color="transparent">
      <Toolbar>
        <Link
          href="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoIcon className="logo-icon" />
          <Typography noWrap component="span" variant="h2" fontWeight="bold">
            Paths viewer
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
