import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useSearchBarStyles } from "./styles";

interface CustomSearchBarProps {
  filterOptions: Array<{ Key: string; Value: string }>;
  dataOptions: Array<{ Name: string; Region: string }>;
  handleSearch: (filterOption: string, textSearch?: string) => void;
}

export function CustomSearchBar({
  filterOptions,
  dataOptions,
  handleSearch,
}: CustomSearchBarProps) {
  const customClasses = useSearchBarStyles();
  const [filter, setFilter] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<{
    Name: string;
    Region: string;
  } | null>(null);
  const [dataOptionsToSelection, setDataOptionsToSelecion] = useState(
    dataOptions
  );

  function handleFilterChange(value: string) {
    setFilter(value);
  }

  function handleSearchTextChange(
    value: { Name: string; Region: string } | null
  ) {
    setSelectedOption(value);
  }

  useEffect(() => {
    if (filter !== "") {
      setDataOptionsToSelecion(
        dataOptions.filter((data) => data.Region === filter)
      );
    } else {
      setDataOptionsToSelecion(dataOptions);
    }
  }, [filter]);

  function onSearch() {
    handleSearch(filter, selectedOption?.Name);
  }

  return (
    <Paper component="form" elevation={0} className={customClasses.root}>
      <Autocomplete
        getOptionLabel={(option) => option.Name}
        options={dataOptionsToSelection}
        placeholder="Buscar países"
        fullWidth
        value={selectedOption}
        renderInput={(props) => (
          <TextField
            {...props}
            variant="outlined"
            label="Escolha um país"
            fullWidth
          />
        )}
        onKeyPress={(event) => {
          if (event.key.toUpperCase() === "ENTER") {
            event.preventDefault();
            onSearch();
          }
        }}
        onChange={(_, value) => handleSearchTextChange(value)}
      />
      <IconButton
        type="submit"
        className={customClasses.iconButton}
        aria-label="search"
        onClick={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Search />
      </IconButton>
      <FormControl
        className={customClasses.formControl}
        variant="outlined"
        fullWidth
      >
        <InputLabel id="region-select">Região</InputLabel>
        <Select
          labelId="region-select"
          value={filter}
          onChange={(event) => handleFilterChange(String(event.target.value))}
          label="Região"
        >
          <MenuItem value="">Todas</MenuItem>
          {filterOptions.map((filter) => (
            <MenuItem key={filter.Key} value={filter.Value}>
              {filter.Value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
