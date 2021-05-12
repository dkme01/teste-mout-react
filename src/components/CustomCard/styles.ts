import { makeStyles } from "@material-ui/core";

export const useCardStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 295,
    margin: "0 auto",
    border: "1px solid #000",
  },
}));
