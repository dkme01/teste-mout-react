import { CircularProgress, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CustomCard } from "../../components/CustomCard";
import { CustomDialog } from "../../components/CustomDialog";
import { CustomPagination } from "../../components/CustomPagination";
import { CustomSearchBar } from "../../components/CustomSearchBar";
import { CountryInfo, getAllCountries } from "../../services/countries";
import { useCountriesStyles } from "./styles";
import { RegionSearch } from "./utils";

const itemsPerPage = 12;

export function Countries() {
  const customClasses = useCountriesStyles();
  const [countries, setCountries] = useState<Array<CountryInfo>>([]);
  const [countriesOnDisplay, setCountriesOnDisplay] = useState<
    Array<CountryInfo>
  >([]);
  const [indexesToShow, setIndexesToShow] = useState<{
    firstItemIndex: number;
    lastItemIndex: number;
  }>({ firstItemIndex: 0, lastItemIndex: 12 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countrySelected, setCountrySelected] =
    useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllCountries().then((response) => {
      if (response?.data !== undefined) {
        setCountries(response.data);
      }
    });
  }, []);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    setCountriesOnDisplay(countries);
    if (loading) {
      setLoading(false);
    }
  }, [countries]);

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    setIndexesToShow({ firstItemIndex, lastItemIndex });
  }, [currentPage]);

  function handleSearch(filterOption: string, searchText?: string) {
    let countriesToDisplay: Array<CountryInfo> = [];
    if (searchText && filterOption !== "") {
      countriesToDisplay = countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchText.toLowerCase()) &&
          country.region === filterOption
      );
    }

    if (filterOption !== "") {
      countriesToDisplay = countries.filter(
        (country) => country.region === filterOption
      );
    }

    if (searchText) {
      countriesToDisplay = countries.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setLoading(false);
    setCountriesOnDisplay(
      countriesToDisplay.length > 0 ? countriesToDisplay : countries
    );
  }

  function handleSelectCountry(country: CountryInfo) {
    setCountrySelected(country);
  }

  function handleCloseModal() {
    setCountrySelected(null);
  }

  return (
    <>
      {countriesOnDisplay.length > 0 && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            classes={{ root: customClasses.gridWidth }}
          >
            <CustomSearchBar
              dataOptions={countries.map((country) => {
                return {
                  Name: country.name,
                  Region: country.region,
                };
              })}
              filterOptions={RegionSearch}
              handleSearch={handleSearch}
            />
          </Grid>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {countriesOnDisplay.map((country, index) => {
                if (
                  index >= indexesToShow.firstItemIndex &&
                  index < indexesToShow.lastItemIndex
                ) {
                  return (
                    <CustomCard
                      key={`${country.name}_${index}`}
                      flag={country.flag}
                      alpha3Code={country.alpha3Code}
                      name={country.name}
                      onClick={() => handleSelectCountry(country)}
                    />
                  );
                }
              })}
              {countriesOnDisplay.length > 1 && (
                <Grid item xs={12}>
                  <CustomPagination
                    dataSize={countriesOnDisplay.length}
                    onPageChange={onPageChange}
                    currentPage={currentPage}
                    pageLimit={itemsPerPage}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
      )}
      {countrySelected && (
        <CustomDialog
          open={countrySelected !== null}
          handleClose={handleCloseModal}
          countrySelected={countrySelected}
        />
      )}
    </>
  );
}
