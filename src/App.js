import React, { Fragment } from "react";
import { Cards, Chart, CountryPicker, NavBar, Particles } from "./components";

import styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: {},
    country: "Worldwide"
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    // console.log(this.data);
  }

  handleCountryChange = async country => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    if (!country) country = "Worldwide";
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <Fragment>
        <NavBar />
        <div className={styles.container}>
          {/* <Particles className={styles.particles}/> */}
          <Cards data={data} />
          <CountryPicker
            handleCountryChange={this.handleCountryChange}
            selectedCountry={country}
          />
          <Chart data={data} country={country} />
        </div>
      </Fragment>
    );
  }
}

export default App;
