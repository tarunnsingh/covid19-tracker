import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl, Menu, MenuItem } from "@material-ui/core";
import { fetchCountries } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setfectchedCountries] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  console.log(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchingCountries = async () => {
      setfectchedCountries(await fetchCountries());
    };
    fetchingCountries();
  }, []);

  return (
    // <div >
    <FormControl variant="outlined" onClick={handleClick}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem>Worldwide</MenuItem>
          {fetchedCountries.map((country, i) => (
            <MenuItem key={i} value={country} onClick={handleClose}>
              {country}
            </MenuItem>
          ))}
        </Menu>
        {/* <option value="">Worldwide</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))} */}
      </NativeSelect>
    </FormControl>
    // </div>
  );
};

export default CountryPicker;
