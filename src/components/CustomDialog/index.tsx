import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { CountryInfo, getCountry } from "../../services/countries";
import { useDialogStyles } from "./styles";

interface CustomDialogProps {
  open: boolean;
  countrySelected: CountryInfo | null;
  handleClose: () => void;
}

export function CustomDialog({
  countrySelected,
  open,
  handleClose,
}: CustomDialogProps) {
  const customClasses = useDialogStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [countryDetails, setCountryDetails] = useState<CountryInfo | null>(
    null
  );

  useEffect(() => {
    setCountryDetails(countrySelected);
    setLoading(false);
  }, [countrySelected]);

  async function getCountryInfo(countryPrefix: string) {
    let countryInfo: CountryInfo | null = null;
    const response = await getCountry(countryPrefix);

    if (response?.data) {
      countryInfo = response.data;
    }

    setCountryDetails(countryInfo);
    setLoading(false);
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar className={customClasses.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
          <Typography variant="h6" className={customClasses.title}>
            {countryDetails?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={customClasses.contentPaper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container direction="row">
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h3"
                className={customClasses.countryFlagTitle}
              >
                {`${countryDetails?.name} - ${countryDetails?.alpha3Code}`}
              </Typography>
              <img
                src={countryDetails?.flag}
                alt={`${countryDetails?.name}'s flag`}
                width="300"
                height="200"
              />
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                Capital
              </Typography>
              <Typography variant="body1">{countryDetails?.capital}</Typography>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                População
              </Typography>
              <Typography variant="body1">
                {countryDetails?.population.toLocaleString("pt-BR")}
              </Typography>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                Região
              </Typography>
              <Typography variant="body1">{countryDetails?.region}</Typography>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                Sub-Região
              </Typography>
              <Typography variant="body1">
                {countryDetails?.subregion}
              </Typography>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                Moeda(s)
              </Typography>
              {countryDetails?.currencies.map((currencie) => (
                <Typography key={currencie.code} variant="body1">
                  {currencie.name}
                </Typography>
              ))}
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                Idioma(s)
              </Typography>
              {countryDetails?.languages.map((language) => (
                <Typography key={language.name} variant="body1">
                  {language.name}
                </Typography>
              ))}
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                Blocos Regionais
              </Typography>
              {countryDetails?.regionalBlocs.map((regionalBloc) => (
                <Typography key={regionalBloc.name} variant="body1">
                  {`${regionalBloc.name} - ${regionalBloc.acronym}`}
                </Typography>
              ))}
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              className={customClasses.countryGrid}
            >
              <Typography
                variant="h6"
                className={customClasses.countryInfoTitle}
              >
                Denominação
              </Typography>
              <Typography variant="body1">{countryDetails?.demonym}</Typography>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
              className={customClasses.countryGrid}
            >
              {countryDetails && countryDetails.borders.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    className={customClasses.countryInfoTitle}
                  >
                    Fronteira(s)
                  </Typography>
                  <span className={customClasses.bordersInline}>
                    {countryDetails?.borders.map((border) => (
                      <Button
                        variant="outlined"
                        key={border}
                        className={customClasses.borderButton}
                        onClick={(e) => {
                          e.preventDefault();
                          getCountryInfo(border);
                          setLoading(true);
                        }}
                      >
                        {border}
                      </Button>
                    ))}
                  </span>
                </>
              )}
            </Grid>
          </Grid>
        )}
      </Paper>
    </Dialog>
  );
}
