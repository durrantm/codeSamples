import { useRef } from 'react';
import { arrayOf, string, number } from 'prop-types';

function AllocationBarRollover({ content, x = 0, y = 0, className = '' }) {
  const rolloverDiv = useRef(null);
  const offset = rolloverDiv.current?.clientWidth / 2 || 0;
  const offsetClass = offset ? '' : 'hidden';
  return (
    <div
      ref={rolloverDiv}
      className={`rollover ${className} ${offsetClass}`}
      style={{ left: `${x - offset}px`, top: `${y}px`, zIndex: 9 }}
      data-testid="rollover"
    >
      {content?.map(measure => {
        const amount = measure.substring(0, measure.length - 1);
        return (
          <span key={measure}>
            {measure.substr(-1) === '%' ?
              <>
                <br />
                <big>
                  <p>{className}</p>
                  <p key={measure}>{amount}&nbsp;%
                    <br /><br />
                  </p>
                </big>
              </>
              :
              <p key={measure} className="rollover_details">{measure}</p>
            }
          </span>
        );
      })
      }
    </div>
  );
}

AllocationBarRollover.propTypes = {
  content: arrayOf(string),
  x: number,
  y: number,
  className: string
};

export default AllocationBarRollover;
