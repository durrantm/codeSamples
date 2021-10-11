import { number } from 'prop-types';
import React from 'react';
import showTimeAMPM from '../../../util/formatDateTime/showTimeAMPM';
import { string } from 'prop-types';

const ShowHourlyTime = ( { time, tz } ) => {
  const showTime = showTimeAMPM(time, tz);
  return (
    <span>
      { showTime.replace(/\D/g, '') }
      <small>
        { showTime.slice(-2) }
      </small>
      &nbsp;&nbsp;
    </span>
  );
};

ShowHourlyTime.propTypes = {
  time: number,
  tz: string
};


export default ShowHourlyTime;