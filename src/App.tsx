import { CssBaseline } from "@material-ui/core";
import { ColorSchemeProvider } from "./hooks/ColorSchemeContext";
import { Main } from "./pages/Main";

export function App() {
  return (
    <ColorSchemeProvider>
      <CssBaseline />
      <Main />
    </ColorSchemeProvider>
  );
}
