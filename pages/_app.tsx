import { CacheProvider, EmotionCache } from "@emotion/react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Provider } from "react-redux";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import store from "../config/store";
import theme from "../config/theme";
import "../css/ColorPicker.css";
import "../css/FilesSelectionContainer.css";
import "../css/FileUploadButton.css";
import "../css/Footer.css";
import "../css/Header.css";
import "../css/Map.css";
import { createEmotionCache } from "./_document";

export interface ICoordinatesData {
  date?: string;
  time?: string;
  id?: string;
  line?: string;
  latitude?: string;
  longitude?: string;
  speed?: string;
}

export interface IFile {
  filename: string;
  color: string;
  data?: ICoordinatesData[];
}

interface AppWithCacheProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppWithCacheProps) {
  const [files, setFiles] = useState<IFile[]>([]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Paths Viewer</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
          <Footer />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
