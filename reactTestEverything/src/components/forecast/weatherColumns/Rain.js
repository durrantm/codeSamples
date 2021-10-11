import React from 'react';
import round from '../../../util/round';
import InchesQuoteSmall from '../../InchesQuoteSmall';

const Rain = ( data ) => {
  const inches = round(Number(data.inches), 1);
  if (inches > 1) {
    return <span className="alert"> { inches }<InchesQuoteSmall/></span>;
  }
  return <span> { inches }<InchesQuoteSmall/></span>;
};

export default Rain;