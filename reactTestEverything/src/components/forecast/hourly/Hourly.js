import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { weatherBitHourlyForecastJSONheader } from '../../../JSONheaders';
import { Link } from 'react-router-dom';
import ShowDetailsRowHourly from './ShowDetailsRowHourly';
import { string, array } from 'prop-types';
import UImodeContext from '../../../UImodeContext';

const Hourly = ({ zip = '', latLong = [], timeZone }) => {
  const [forecastHourly, setForecastHourly] = useState({});
  const weatherBitHourlyForecast = weatherBitHourlyForecastJSONheader(latLong);

  const resetForecastHourly = () => {
    setForecastHourly({});
  };

  const setHourlyForecast = () => {
    axios.request(weatherBitHourlyForecast)
      .then(function (response) {
        const responseData = response.data.data;
        const reducedResponse = responseData.reduce((result, item, index) => {
          return { ...result, [index]: item, };
        }, {});
        setForecastHourly({ ...reducedResponse });
      })
      .catch(function () {
        resetForecastHourly();
      });
  };

  useEffect(() => {
    if (latLong[0] !== 0 && latLong[1] !== 0) {
      setHourlyForecast();
    }
    if (zip.length !== 5 || isNaN(zip)) {
      resetForecastHourly();
    }
  }, [...latLong]);

  return (
    <>
      <UImodeContext.Consumer>
        {UImode =>
          <section id="forecast-hourly" className={UImode}>
            <span className={`${UImode} table-heading`} >
              <Link to="/daily" data-testid="daily-link">Daily</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="current-route">
                Hourly
              </span>
              <br />
            </span>
            <table id="weather-data" align="center">
              <thead>
                <tr className="not-on-mobile" id="forecast-header">
                  <th className={`${UImode}`}>&nbsp;&nbsp;</th>
                  <th className={UImode}></th>
                  <th className={`${UImode}`}>Temp</th>
                  <th className={`${UImode} bigger-screen-only`}>&nbsp;&nbsp;Feels Like</th>
                  <th className={UImode}></th>
                  <th className={`${UImode} big-screen-only`}>Clouds</th>
                  <th className={UImode}>&nbsp;</th>
                  <th className={`${UImode} big-screen-only`}></th>
                  <th className={`${UImode} not-on-mobile`}>&nbsp;&nbsp;Precip</th>
                  <th className={`${UImode} bigger-screen-only`}>&nbsp;&nbsp;Pressure</th>
                  <th className={`${UImode} full-screen-only`}>&nbsp;&nbsp;Visibility</th>
                </tr>
              </thead>
              <tbody className={UImode}>
                {forecastHourly[0] && Object.values(forecastHourly).map((one_day, index) => {
                  one_day.timeZone = timeZone;
                  return <ShowDetailsRowHourly day={one_day} key={index} />;
                })}
              </tbody>
            </table>
          </section>
        }
      </UImodeContext.Consumer>
    </>
  );
};

Hourly.propTypes = {
  zip: string,
  timeZone: string,
  latLong: array,
  UImode: string
};

export default Hourly;