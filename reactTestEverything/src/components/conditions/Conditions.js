import React, { useState, useEffect } from 'react';
import axios from 'axios';
import round from '../../util/round';
import getCompassDirection from '../../util/getCompassDirection';
import { openWeatherMapJSONheader } from '../../JSONheaders';
import UImodeContext from '../../UImodeContext';
import Today from './Today';
import { string } from 'prop-types';
const openweathermapICON_URL = 'https://openweathermap.org/img/wn/';

const Conditions = ({ zip = '' }) => {
  const [conditions, setConditions] = useState({ weather: { main: "Fair" }, iconCode: "04d" });
  const openWeatherMapConditions = openWeatherMapJSONheader(zip);
  const iconCode = conditions.iconCode ? conditions.iconCode : '04d';
  const resetConditions = () => {
    setConditions({});
  };
  const setConditionsDetails = (response) => {
    setConditions({
      weatherMain: response.data.weather[0].main,
      weatherTemp: round(response.data.main.temp),
      windSpeed: round(response.data.wind.speed * 0.6213711922),
      windDirection: round(response.data.wind.deg),
      windCompassDirection: getCompassDirection(response.data.wind.deg),
      iconCode: `${response.data.weather[0].icon}`
    });
  };
  useEffect(() => {
    if (zip.length === 5 && !isNaN(zip)) {
      // Axios call to get Current Conditions, temp, min temp, max temp, windspeed
      axios.request(openWeatherMapConditions)
        .then(function (response) {
          setConditionsDetails(response);
        })
        .catch(function () {
          resetConditions();
        });
    }
    if (zip.length !== 5 || isNaN(zip)) {
      resetConditions();
    }
  }, [zip]);

  return (
    <>
      <UImodeContext.Consumer>
        {UImode =>
          <section id="conditions" className={ UImode }>
            <div data-testid="conditions">
              <span className="today">
                <Today />
              </span>
              <span id="forecast-conditions">
                <img align="center" src={`${openweathermapICON_URL}${iconCode}@2x.png`} />&nbsp;
              </span>
              <span id="forecast-temperature">
                {conditions.weatherTemp}°
              </span><small>F</small>
            </div>
            <span id="conditions-wind">
              {conditions.weatherMain}
        &nbsp; {conditions.windCompassDirection}&nbsp;&nbsp;
              {conditions.windSpeed}<span className="conditions-mph">mph</span>
            </span>
          </section>
        }
      </UImodeContext.Consumer>
    </>
  );
};

Conditions.propTypes = {
  zip: string
};

export default Conditions;