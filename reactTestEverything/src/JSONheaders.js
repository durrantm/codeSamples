const redlineJSONheader = (zip )=>  {
  const redlineHOST = 'https://redline-redline-zipcode.p.rapidapi.com';
  const rapidAPIkey = process.env.REACT_APP_X_RAPIDAPI_KEY;
  return {
    method: 'GET',
    url: `${redlineHOST}/rest/info.json/${zip}/degrees`,
    headers: {
      'x-rapidapi-key': `${ rapidAPIkey }`,
      'x-rapidapi-host': 'redline-redline-zipcode.p.rapidapi.com'
    },
  };
};
const openWeatherMapJSONheader = (zip) => {
  const openweathermapHOST = 'https://api.openweathermap.org';
  const appIdWeather = `${process.env.REACT_APP_WEATHER_API_KEY}`;
  const openWeatherMapConditions = {
    method: 'GET',
    url: `${openweathermapHOST}/data/2.5/weather?zip=${zip},us&appid=${appIdWeather}&units=imperial`
  };
  return openWeatherMapConditions;
};
const weatherBitDailyForecastJSONheader = (latLong) => {
  const weatherBitHOST = 'https://weatherbit-v1-mashape.p.rapidapi.com';
  const rapidAPIkey = process.env.REACT_APP_X_RAPIDAPI_KEY;
  const weatherBitForecast = {
    method: 'GET',
    url: `${weatherBitHOST}/forecast/daily`,
    params: {lat: latLong[0], lon: latLong[1], units: "I" },
    headers: {
      'x-rapidapi-key': `${ rapidAPIkey }`
    }
  };
  return weatherBitForecast;
};

const weatherBitHourlyForecastJSONheader = (latLong) => {
  const weatherBitHOST = 'https://weatherbit-v1-mashape.p.rapidapi.com';
  const rapidAPIkey = process.env.REACT_APP_X_RAPIDAPI_KEY;
  const weatherBitForecast = {
    method: 'GET',
    url: `${weatherBitHOST}/forecast/hourly`,
    params: {lat: latLong[0], lon: latLong[1], units: "I" },
    headers: {
      'x-rapidapi-key': `${ rapidAPIkey }`
    }
  };
  return weatherBitForecast;
};

export { redlineJSONheader,
  openWeatherMapJSONheader,
  weatherBitDailyForecastJSONheader,
  weatherBitHourlyForecastJSONheader,
};