import React, { Fragment } from "react";
import { Cards, Chart, CountryPicker, NavBar, Particles } from "./components";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
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
    this.state.loading
      ? this.setState({ loading: false })
      : this.setState({ loading: true });
  };

  handleDarkMode = () => {
    this.state.darkmode
      ? this.setState({ darkmode: false })
      : this.setState({ darkmode: true });
  };

  handleCountryChange = async country => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    if (!country) country = "Worldwide";
    this.setState({ data: fetchedData, country: country, laoding: false });
  };

  render() {
    const { data, country } = this.state;
    console.log("here", this.state);
    const theme = createMuiTheme({
      palette: {
        type: this.state.darkmode ? "dark" : "light"
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <NavBar handleDarkMode={this.handleDarkMode} />
          <div className={styles.container}>
            {/* <Particles className={styles.particles}/> */}
            <Cards data={data} loading={this.state.loading} />
            <CountryPicker
              loading={this.state.loading}
              handleLoading={this.handleLoading}
              handleCountryChange={this.handleCountryChange}
              selectedCountry={country}
            />
            <Chart data={data} country={country} />
          </div>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}

export default App;
