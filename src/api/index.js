import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let changedUrl = url;
  if (typeof country !== "undefined" && country.localeCompare("Worldwide")) {
    changedUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(changedUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    let { data } = await axios.get(`${url}/daily`);
    // console.log(data);
    console.log(data.length);
    console.log(data.slice(-50).length);
    data = data.slice(-60);
    const modifiedDailydata = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      incident: dailyData.incidentRate,
      date: dailyData.reportDate
    }));
    return modifiedDailydata;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);
    return countries.map(country => country.name);
  } catch (error) {
    console.log(error);
  }
};
