import { arrayOf, number } from 'prop-types';
import { numRowsLimits } from '../../shared.constants';
import usePageSettings from '../../hooks/usePageSettings';

function LimitButtonsRow({ values = numRowsLimits }) {
  const { limit, setLimit } = usePageSettings();
  const activeVal = limit || values[0];
  return (
    <tr className="limit-btn-row">
      <th colSpan="10" className="righty">
        <div className="limit-btn-group">
          {values.map(val => {
            const activeClass = val === activeVal ? 'active' : '';
            return (
              <button
                className={activeClass}
                data-testid={`limit${val}`}
                onClick={() => setLimit(val)}
                key={val}
              >
                {val}
              </button>
            );
          })}
        </div>
      </th>
    </tr>
  );
}

LimitButtonsRow.propTypes = {
  values: arrayOf(number)
};

export default LimitButtonsRow;
