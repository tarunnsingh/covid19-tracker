import React, { Fragment } from "react";
import { Cards, Chart, CountryPicker, NavBar, TweetCard } from "./components";
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    country: "Worldwide",
    darkmode: false,
    loading: false
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    // console.log(this.data);
  }

  handleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  handleDarkMode = () => {
    this.setState({ darkmode: !this.state.darkmode });
  };

  handleCountryChange = async country => {
    const fetchedData = await fetchData(country);
    console.log("fetchedData", fetchedData);
    console.log("state", this.state);
    if (!country) country = "Worldwide";
    this.setState({ data: fetchedData, country: country, loading: false });
  };

  render() {
    const { data, country } = this.state;

    const theme = createMuiTheme({
      palette: {
        type: this.state.darkmode ? "dark" : "light"
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <NavBar handleDarkMode={this.handleDarkMode} />
          <Grid container spacing={3} className={styles.container}>
            <Grid item xs={12} sm={6}>
              <Cards data={data} loading={this.state.loading} />

              <Chart data={data} country={country} />
            </Grid>

            <Grid item spacing-top={2} xs={12} sm={6} className={styles.item}>
              <CountryPicker
                loading={this.state.loading}
                handleLoading={this.handleLoading}
                handleCountryChange={this.handleCountryChange}
                selectedCountry={country}
              />
              <TweetCard />
            </Grid>
          </Grid>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}

export default App;
