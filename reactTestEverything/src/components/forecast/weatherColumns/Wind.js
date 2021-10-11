import React from 'react';
import round from '../../../util/round';

const Wind = ( data ) => {
  const speed = round(Number(data.speed));
  const direction = data.direction;
  const className = Number(speed) > 20 ? "alert" : "";
  return(
    <span className={ className } >
      &nbsp;<small>{ direction }</small>&nbsp;
      { speed }<small>mph</small>
    </span>
  );
};

export default Wind;
