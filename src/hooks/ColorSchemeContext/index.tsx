import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createContext, useContext, useState } from "react";
import { useStyles } from "./styles";

interface ColorSchemeContextData {
  darkState: boolean;
  handleThemeChange: () => void;
  customClasses: any;
}

const ColorSchemeContext = createContext<ColorSchemeContextData>(
  {} as ColorSchemeContextData
);

function ColorSchemeProvider({ children }: any) {
  const [darkState, setDarkState] = useState(true);
  const mainPrimaryColor = darkState ? "#ff9800" : "#03a9f4";
  const mainSecondaryColor = darkState ? "##bf360c" : "#673ab7";
  const customClasses = useStyles();
  const darkTheme = createMuiTheme({
    palette: {
      type: darkState ? "dark" : "light",
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  function handleThemeChange() {
    setDarkState(!darkState);
  }

  return (
    <ColorSchemeContext.Provider
      value={{
        darkState,
        customClasses,
        handleThemeChange,
      }}
    >
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </ColorSchemeContext.Provider>
  );
}

function useColorSchemeContext(): ColorSchemeContextData {
  const context = useContext(ColorSchemeContext);

  if (!context) {
    throw new Error(
      "useColorSchemeContext must be used within an ColorSchemeProvider"
    );
  }
  return context;
}

function withColorSchemeContext(Component: any) {
  return function componentBoundWithAppContext(props: any): JSX.Element {
    return (
      <ColorSchemeContext.Consumer>
        {(appContext) => <Component {...props} appContext={appContext} />}
      </ColorSchemeContext.Consumer>
    );
  };
}

export {
  ColorSchemeContext,
  useColorSchemeContext,
  withColorSchemeContext,
  ColorSchemeProvider,
};
