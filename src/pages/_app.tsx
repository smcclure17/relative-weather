import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const baseTheme = createTheme({
    breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 } },
  });
  return (
    <ThemeProvider theme={baseTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
