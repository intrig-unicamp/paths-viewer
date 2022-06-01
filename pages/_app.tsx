import { CacheProvider, EmotionCache } from "@emotion/react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import "../components/ColorPicker/ColorPicker.css";
import "../components/FilesSelectionContainer/FilesSelectionContainer.css";
import "../components/FileUploadButton/FileUploadButton.css";
import Footer from "../components/Footer/Footer";
import "../components/Footer/Footer.css";
import Header from "../components/Header/Header";
import "../components/Header/Header.css";
import "../components/Map/Map.css";
import store from "../config/store";
import theme from "../config/theme";
import { createEmotionCache } from "./_document";

interface AppWithCacheProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppWithCacheProps) {
  const { title: customTitle } = pageProps;

  let title = "Paths Viewer";
  if (customTitle) {
    title = `${customTitle} | ${title}`;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{title}</title>
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
