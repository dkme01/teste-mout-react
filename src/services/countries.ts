import { AxiosResponse } from "axios";
import api from "./api";

export interface CountryInfo {
  name: string;
  topLevelDomain: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<string>;
  capital: string;
  altSpellings: Array<string>;
  region: string;
  subregion: string;
  population: number;
  latlng: Array<number>;
  demonym: string;
  area: number;
  gini: number;
  timezones: Array<string>;
  borders: Array<string>;
  nativeName: string;
  numericCode: string;
  currencies: Array<CountryCurrencie>;
  languages: Array<CountryLanguage>;
  translations: any;
  flag: string;
  regionalBlocs: Array<CountryRegionalBloc>;
  cioc: string;
}

export interface CountryLanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface CountryCurrencie {
  code: string;
  name: string;
  symbol: string;
}

export interface CountryRegionalBloc {
  acronym: string;
  name: string;
}

export async function getAllCountries() {
  let countryResponse: AxiosResponse<Array<CountryInfo>>;
  try {
    countryResponse = await api.get<any, AxiosResponse<Array<CountryInfo>>>("all");
    return countryResponse;
  } catch (error) {
    console.error(error);
  }
}

export async function getCountry(search: string) {
  let countryResponse: AxiosResponse<CountryInfo> | null = null;
  try {
    countryResponse = await api.get<any, AxiosResponse<CountryInfo>>(`alpha/${search}`);
    return countryResponse;
  } catch (error) {
    console.error(error);
  }
}
