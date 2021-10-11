import React from 'react';
import { object, number, string } from 'prop-types';
import round from '../../../util/round';
import showDate from '../../../util/formatDateTime/showDate';
import showDayNameDaily from '../../../util/formatDateTime/showDayNameDaily';
import showUnixTime from '../../../util/formatDateTime/showUnixTime';
import Description from '../weatherColumns/Description';
import Temperature from '../weatherColumns/Temperature';
import Snow from '../weatherColumns/Snow';
import Moon from '../weatherColumns/Moon';
import Wind from '../weatherColumns/Wind';
import Rain from '../weatherColumns/Rain';
import Icon from '../weatherColumns/Icon';

const ShowDetailsRowDaily = ({ day }) => {
  const { weather: { description = '', icon }, high_temp, low_temp, valid_date,
    wind_spd, wind_cdir, snow, clouds, rh,
    precip, sunrise_ts, sunset_ts, moonrise_ts, moonset_ts, moon_phase_lunation } = day;
  const dayOfWeek = showDayNameDaily(valid_date);
  const [dayName, restOfDayName] = [dayOfWeek.substring(0, 3), dayOfWeek.substring(3, 9)];
  const date = showDate(day.valid_date);
  const timeZone = day.timeZone;
  const sunrise = showUnixTime(sunrise_ts, timeZone);
  const sunset = showUnixTime(sunset_ts, timeZone);
  const moonrise = showUnixTime(moonrise_ts, timeZone);
  const moonset = showUnixTime(moonset_ts, timeZone);
  const rain = round(precip, 1);
  return (
    <tr >
      <td className="day-name">{dayName}
        <span className="big-screen-only">{restOfDayName}</span>&nbsp;&nbsp;
      </td>
      <td className="forecast-smaller"> {date}&nbsp;&nbsp;
        <span className="not-on-mobile">&nbsp;&nbsp;</span>
      </td>
      <td>
        <span className="high-temperature">
          <Temperature temperature={high_temp} />
        </span>°/&nbsp;
      </td>
      <td>
        <span className="forecast-smaller">
          <Temperature temperature={low_temp} />
        </span>°
      </td>
      <td>&nbsp;
        <Icon icon={icon} />
      </td>
      <td className="big-screen-only">
        <Rain inches={rain} />
      </td>
      <td id="daily-description" className="not-on-mobile">
        <Description text={description} />
      </td>
      <td className="bigger-screen-only">
        <Snow inches={snow} />
      </td>
      <td className="biggest-screen-only"> {clouds}<small>%</small></td>
      <td className="big-screen-only" style={{ textAlign: "right" }}>
        <Wind speed={wind_spd} direction={wind_cdir} />
      </td>
      <td className="not-on-mobile">  {rh}<small>%</small> </td>
      <td className="biggest-screen-only"><small>↑</small>{sunrise}</td>
      <td className="biggest-screen-only"><small>↓</small>{sunset}</td>
      <td className="full-screen-only"><small>↑</small>{moonrise}</td>
      <td className="full-screen-only">
        <Moon moon_phase_lunation={moon_phase_lunation} />
      </td>
      <td className="full-screen-only"><small>↓</small>{moonset}</td>
    </tr>
  );
};
ShowDetailsRowDaily.propTypes = {
  day: object,
  idx: number,
  timeZone: string,
  valid_date: string,
  high_temp: number,
  low_temp: number,
  rh: number,
  wind_spd: number,
  wind_cdir: string,
  sunrise: number,
  sunset: number
};
export default ShowDetailsRowDaily;