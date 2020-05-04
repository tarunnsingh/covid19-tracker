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

const CountryPicker = ({ handleCountryChange, selectedCountry }) => {
  const [fetchedCountries, setfectchedCountries] = useState([]);
  console.log("Selected Country:", selectedCountry);
  useEffect(() => {
    const fetchingCountries = async () => {
      setfectchedCountries(await fetchCountries());
    };
    fetchingCountries();
  }, []);

  return (
    // <div >
    <FormControl className={styles.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
      <Select
        defaultValue="Worldwide"
        value={selectedCountry}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={e => handleCountryChange(e.target.value)}
      >
        <MenuItem value="Worldwide">Worldwide</MenuItem>
        {fetchedCountries.map((country, i) => (
          <MenuItem key={i} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        Select a country from the list for it's current stats.
      </FormHelperText>
    </FormControl>
    // </div>
  );
};

export default CountryPicker;
