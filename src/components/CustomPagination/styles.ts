import { createStyles, makeStyles } from "@material-ui/core";

export const usePaginationStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1vh",
    },
    paginationUl: {
      flexWrap: "nowrap",
    },
  })
);
