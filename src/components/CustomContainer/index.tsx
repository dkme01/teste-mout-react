import { Container, Grid, Paper } from "@material-ui/core";
import { useColorSchemeContext } from "../../hooks/ColorSchemeContext";

export function CustomContainer({ children }: any) {
  const { customClasses } = useColorSchemeContext();

  return (
    <main className={customClasses.content}>
      <Container maxWidth="lg" className={customClasses.container}>
        <Grid container spacing={2} direction="row" justify="center">
          <Paper className={customClasses.paper}>{children}</Paper>
        </Grid>
      </Container>
    </main>
  );
}
