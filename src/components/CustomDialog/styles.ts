import { createStyles, makeStyles } from "@material-ui/core";

export const useDialogStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    contentPaper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
    },
    countryGrid: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "2rem",
    },
    countryInfoTitle: {
      fontWeight: "bold",
      marginBottom: "0.25rem",
    },
    countryFlagTitle: {
      fontWeight: "bold",
      margin: "1.5rem 0",
    },
    bordersInline: {
      display: "flex",
      flexDirection: "row",
    },
    borderButton: {
      margin: 8,
    },
    previousButton: {
      margin: "16px 0",
    },
  })
);
