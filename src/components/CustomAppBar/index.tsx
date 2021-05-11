import { AppBar, Switch, Toolbar, Typography } from "@material-ui/core";
import { Brightness3, Brightness7 } from "@material-ui/icons";
import clsx from "clsx";
import ToggleIcon from "material-ui-toggle-icon";
import { useColorSchemeContext } from "../../hooks/ColorSchemeContext";

export function CustomAppBar() {
  const {
    customClasses,
    darkState,
    handleThemeChange,
  } = useColorSchemeContext();
  return (
    <AppBar position="absolute" className={clsx(customClasses.appBar)}>
      <Toolbar className={customClasses.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={customClasses.title}
        >
          World Countries
        </Typography>
        <ToggleIcon
          on={darkState}
          onIcon={<Brightness3 />}
          offIcon={<Brightness7 />}
        />
        <Switch checked={darkState} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
}
