import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { useCardStyles } from "./styles";

export interface CardProps {
  flag: string;
  name: string;
  alpha3Code: string;
  onClick: () => void;
}

export function CustomCard({ flag, name, alpha3Code, onClick }: CardProps) {
  const cardStyle = useCardStyles();

  return (
    <Grid item xs={12} md={3} lg={3}>
      <Card className={cardStyle.card}>
        <CardMedia
          component="img"
          alt={`${name}'s flag`}
          height="140"
          image={flag}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${name} - ${alpha3Code}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
            size="small"
            color="primary"
          >
            Detalhes
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
