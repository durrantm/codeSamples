import { number } from 'prop-types';
import React from 'react';

const Temperature = ({ temperature = 0 }) => {
  if (temperature === 0) return '';
  const temp = Number(Number(temperature.toFixed(0)));
  const tempAbsolute = Math.abs(temp);
  let formattedTemp;
  if (temp > 9 || temp < -9) { formattedTemp = `${temp}`; }
  if (temp >= 0 && temp <= 9) { formattedTemp = `${String(temp)}`; }
  if (temp < 0 && temp > -10) { formattedTemp = `-${tempAbsolute}`; }
  // if (tempAbsolute === 0) { formattedTemp = '0'; }
  if (temp >= 0 && temp <= 9 ) {
    return <span>&nbsp;&nbsp;{temp}</span>;
  }
  if (temp >= -9 && temp < 0 ) {
    return <span>&nbsp;&nbsp;{temp}</span>;
  }
  return (
    <span>{formattedTemp}</span>
  );
};

Temperature.propTypes = {
  temperature: number
};

export default Temperature;