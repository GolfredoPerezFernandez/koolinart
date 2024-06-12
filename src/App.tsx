import React from "react";
import Moralis from "moralis";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "@/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";

import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import MainAppRoutes from "@/navigation/routes";

import { MoralisProvider } from "react-moralis";
import { serverUrl, appId, moralisApiKey } from "@/config/moralis-connect";

import { AppContextProvider } from "@/context/AppContextProvider";

export default function App() {
  const { ThemeModeState } = useBoundStore((state: any) => state, shallow);

  if (!Moralis.Core.isStarted) {
    const moralisStart = async () => {
      await Moralis.start({
        apiKey: moralisApiKey,
      });
    };
    moralisStart();
  }
  const getTheme = React.useMemo(
    () => createTheme(theme(ThemeModeState)),
    [ThemeModeState]
  );
  return (
    <>
      <ThemeProvider theme={getTheme}>
        <CssBaseline />
        <React.StrictMode>
          <MoralisProvider appId={appId} serverUrl={serverUrl}>
            <AppContextProvider>
              <Router>
                <MainAppRoutes />
              </Router>
            </AppContextProvider>
          </MoralisProvider>
        </React.StrictMode>
      </ThemeProvider>
    </>
  );
}
