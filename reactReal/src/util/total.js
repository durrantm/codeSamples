import { arrayOf, number, func } from 'prop-types';

const total = (array, accessor = val => val) =>
  array.reduce((sum, current) => sum + accessor(current), 0);

total.propTypes = {
  array: arrayOf(number),
  accessor: func
};

export default total;
