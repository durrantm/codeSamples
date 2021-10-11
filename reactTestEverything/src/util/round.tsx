const round = (num: number, decimals: number = 0) => {
  if (typeof num === 'number') return num.toFixed(decimals);
  return '-';
};

export default round;