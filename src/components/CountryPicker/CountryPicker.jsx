import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../../api";

import styles from "./CountryPicker.modules.css";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setfectchedCountries] = useState([]);

  useEffect(() => {
    const fetchingCountries = async () => {
      setfectchedCountries(await fetchCountries());
    };
    fetchingCountries();
  });

  return (
    <FormControl style={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="global">Global</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
