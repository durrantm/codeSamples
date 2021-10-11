import React from 'react';
import UImodeContext from '../../UImodeContext';
import { object } from 'prop-types';

const Location = ( { location = '' } ) => {
  return (
    <>
      <UImodeContext.Consumer>
        {UImode =>
          <div>
            <span
              id="location-city-state"
              data-testid="location-city-state"
              className={UImode}>
              {location.city}&nbsp;{location.state}
            </span>
            <br />
            <div id="timezone">
              {location.timeZone}
            </div>
          </div>
        }
      </UImodeContext.Consumer>
    </>
  );
};

Location.propTypes = {
  location: object,
};
export default Location;