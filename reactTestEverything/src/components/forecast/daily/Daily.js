import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { weatherBitDailyForecastJSONheader } from '../../../JSONheaders';
import { Link } from 'react-router-dom';
import ShowDetailsRowDaily from './ShowDetailsRowDaily';
import { array, object, string } from 'prop-types';
import UImodeContext from '../../../UImodeContext';

const Daily = ({ zip='', latLong = [], timeZone }) => {
  const [forecast, setForecast] = useState({});
  const weatherBitDailyForecast = weatherBitDailyForecastJSONheader(latLong);

  const resetForecast = () => {
    setForecast({});
  };

  const setDailyForecast = () => {
    axios.request(weatherBitDailyForecast)
      .then(function (response) {
        const responseData = response.data.data;
        const reducedResponse = responseData.reduce((result, item, index) => {
          return { ...result, [index]: item, };
        }, {});
        setForecast({ ...reducedResponse });
      })
      .catch(function () { resetForecast(); });
  };

  useEffect(() => {
    if (latLong && latLong[0] !== 0 && latLong[1] !== 0) {
      // Axios call to get the 16 Day and Hourly forecasts
      setDailyForecast();
    }
    if (zip.length !== 5 || isNaN(zip)) {
      resetForecast();
    }
  }, [...latLong]);

  const Space2 = () => {
    return <>&nbsp;&nbsp;</>;
  };

  return (
    <>
      <UImodeContext.Consumer>
        {UImode =>
          <section id="forecast-daily" className={UImode}>
            <span className={`${UImode} table-heading`}>
              <span className="current-route">
                Daily&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <Link to="/hourly" data-testid="hourly-link">Hourly</Link><br />
            </span>
            <table id="weather-data" align="center">
              <tbody className={UImode}>
                <tr className="not-on-mobile" id="forecast-header">
                  <th className={`${UImode} day-name`}></th>
                  <th className={UImode} ></th>
                  <th className={`${UImode}`} >Hi</th>
                  <th className={`${UImode}`} >Lo</th>
                  <th className={UImode} ></th>
                  <th className={`${UImode} big-screen-only`}>Precip</th>
                  <th className={`${UImode} not-on-mobile-screen-only`}></th>
                  <th className={`${UImode} bigger-screen-only`}>&nbsp;Snow&nbsp;</th>
                  <th className={`${UImode} biggest-screen-only`}>Clouds</th>
                  <th className={`${UImode} big-screen-only`} ></th>
                  <th className={`${UImode} not-on-mobile`}>&nbsp;Humidity</th>
                  <th className={`${UImode} biggest-screen-only`}><Space2 />Sunrise<Space2 /> </th>
                  <th className={`${UImode} biggest-screen-only`}><Space2 />Sunset<Space2 /> </th>
                  <th className={`${UImode} full-screen-only`}><Space2 />Moonrise</th>
                  <th className={`${UImode} full-screen-only`}><Space2 /></th>
                  <th className={`${UImode} full-screen-only`}><Space2 />Moonset</th>
                </tr>
                {forecast[0] && Object.values(forecast).map((one_day, index) => {
                  one_day.timeZone = timeZone;
                  return (
                    <ShowDetailsRowDaily
                      day={one_day} key={index}
                    />
                  );
                })}
              </tbody>
            </table>
          </section>
        }
      </UImodeContext.Consumer>
    </>
  );
};

Daily.propTypes = {
  zip: string,
  latLong: array,
  forecast: object,
  timeZone: string,
  UImode: string
};
export default Daily;