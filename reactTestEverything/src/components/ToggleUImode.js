import { func } from 'prop-types';
import React from 'react';
import UImodeContext from '../UImodeContext';

const ToggleUImode = ({ toggleUImode } ) => {
  return (
    <>
      <UImodeContext.Consumer>
        {UImode =>
          <span>
            <span
              id="ui-mode-switcher"
              data-testid="edaUImodeSwitcher"
              className={UImode}
              onClick={toggleUImode} >
              mode
            </span>
          </span>
        }
      </UImodeContext.Consumer>
    </>
  );
};

ToggleUImode.propTypes = {
  toggleUImode: func
};

export default ToggleUImode;