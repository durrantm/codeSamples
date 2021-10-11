import { number, string } from 'prop-types';
import React from 'react';
import monthName from '../../util/formatDateTime/showMonthName';
import UImodeContext from '../../UImodeContext';
import daysOfTheWeek from '../../util/formatDateTime/daysOfTheWeek';
const Today = () => {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const todayName = today.getDay();
  const days = new Map(daysOfTheWeek.map((day, idx) => { return [idx, day]; }));
  const dayName = days.get(todayName).substring(0, 3);
  const month = today.getMonth();
  const theMonthName = monthName(month);
  let hours = today.getHours();
  let minutes = today.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hours12 = hours % 12;
  hours = hours12 === 0 ? '12' : hours12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strDate = `${dayName} ${theMonthName} ${dayOfMonth}`;
  const strTime = `${hours}:${minutes}${ampm}`;
  return (
    <span>
      <UImodeContext.Consumer>
        {UImode =>
          <div id="date-time" className={UImode} >
            &nbsp; {strDate}
            &nbsp;&nbsp; {strTime}
          </div>
        }
      </UImodeContext.Consumer>
    </span>
  );
};

Today.propTypes = {
  testDay: number,
  UImode: string
};

export default Today;