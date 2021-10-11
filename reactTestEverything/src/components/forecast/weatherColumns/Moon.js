import React from 'react';
import {object, number, oneOfType } from 'prop-types';

const Moon = ( { moon_phase_lunation} ) => {
  const lunation = Number(moon_phase_lunation);
  let imageToUse;
  if (lunation <= .06) imageToUse = 'new';
  if (lunation > 0.06 && lunation <= .19) imageToUse = 'waxing_crescent';
  if (lunation > 0.19 && lunation <= .31) imageToUse = 'third_quarter';
  if (lunation > 0.31 && lunation <= .44) imageToUse = 'waxing_gibbous';
  if (lunation > 0.44 && lunation <= .56) imageToUse = 'full';
  if (lunation > 0.56 && lunation <= .69) imageToUse = 'waning_gibbous';
  if (lunation > 0.69 && lunation <= .81) imageToUse = 'first_quarter';
  if (lunation > 0.81 && lunation <= .94) imageToUse = 'waning_crescent';
  if (lunation > 0.94 ) imageToUse = 'new';
  const imageURL = `/moonIcons/${imageToUse}.png`;
  return (
    <span>
      <img data-testid="lunation" src= { imageURL } width="20px" height="20px" />
    </span>
  );
};
Moon.propTypes = {
  moon_phase_lunation: oneOfType([ object, number ])
};


export default Moon;