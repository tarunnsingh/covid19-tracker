import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText
} from "@material-ui/core";
import { fetchCountries } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({
  loading,
  handleLoading,
  handleCountryChange,
  selectedCountry
}) => {
  const [fetchedCountries, setfectchedCountries] = useState([]);
  console.log("Selected Country:", selectedCountry);

  useEffect(() => {
    const fetchingCountries = async () => {
      setfectchedCountries(await fetchCountries());
    };
    fetchingCountries();
  }, []);

  const handleOnClick = e => {
    handleCountryChange(e.target.value);
    handleLoading();
  };

  return (
    // <div >
    <FormControl className={styles.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
      <Select
        defaultValue="Worldwide"
        value={selectedCountry}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={e => handleOnClick(e)}
      >
        <MenuItem value="Worldwide">Worldwide</MenuItem>
        {fetchedCountries.map((country, i) => (
          <MenuItem key={i} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {!loading && `Select a country from the list for it's current stats`}
        {loading && `Fetching data...`}
      </FormHelperText>
    </FormControl>
    // </div>
  );
};

export default CountryPicker;
