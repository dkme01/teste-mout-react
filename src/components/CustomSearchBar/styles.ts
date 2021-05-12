import { createStyles, makeStyles } from "@material-ui/core";

export const useSearchBarStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
    },
    iconButton: {
      padding: 10,
      margin: "0 10px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
  })
);
