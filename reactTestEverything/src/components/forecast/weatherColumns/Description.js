import React from 'react';
import { string } from 'prop-types';

const Description = ({ text }) => {
  const fullText = text;
  const cutOff = 17;
  const startingText = fullText.length <= cutOff ? fullText : fullText.substring(0, cutOff);
  const remainderText = fullText.length >= cutOff ? `${fullText.substring(cutOff, 30)}` : '';
  const alert = fullText.match(/(heavy|thunder|blizzard)/i) ? 'alert' : '';
  return (
    <span className = { alert } >
      <span>
        {startingText}
      </span>
      <span data-testid="description-big-screen-only" className="bigger-screen-only">
        {remainderText}
      </span>
    </span>
  );
};

Description.propTypes = {
  text: string
};

export default Description;