import React from 'react';
import round from '../../../util/round';
import InchesQuoteSmall from '../../InchesQuoteSmall';

const Snow = ( data ) => {
  const inches = round(Number(data.inches), 0);
  if (inches > 2) {
    return <span data-testid="snow" className="alert"> { inches }<InchesQuoteSmall/></span>;
  }
  return <span data-testid="snow"> { inches }<InchesQuoteSmall/></span>;
};

export default Snow;