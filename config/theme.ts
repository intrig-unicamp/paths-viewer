import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#ae3ec9",
      light: "#e599f7",
      dark: "#862e9c",
      contrastText: "#f8f0fc",
    },
    secondary: {
      main: "#f76707",
      light: "#ffc078",
      dark: "#d9480f",
      contrastText: "#fff4e6",
    },
    background: {
      default: "#f1f3f5",
    },
    text: {
      primary: "rgba(52,58,64,0.87)",
      secondary: "rgba(52,58,64,0.54)",
    },
    success: {
      main: "#0ca678",
      light: "#96f2d7",
      dark: "#087f5b",
      contrastText: "#e6fcf5",
    },
    info: {
      main: "#1098ad",
      dark: "#0b7285",
      light: "#66d9e8",
      contrastText: "#e3fafc",
    },
    warning: {
      main: "#f59f00",
      dark: "#e67700",
      light: "#ffe066",
      contrastText: "#001fc1",
    },
    error: {
      main: "#f03e3e",
      light: "#ffa8a8",
      dark: "#c92a2a",
      contrastText: "#fff5f5",
    },
    divider: "#495057",
  },
  typography: {
    htmlFontSize: 14,
    h1: {
      fontSize: 24,
    },
    h2: {
      fontSize: 20,
    },
    h3: {
      fontSize: 16,
    },
    h4: {
      fontSize: 14,
    },
    body1: {
      fontSize: 12,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
