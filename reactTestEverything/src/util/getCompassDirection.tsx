import round from './round';

const getCompassDirection = (windDirection: number) => {
  if ( isNaN(windDirection)) return '-';
  const direction: number = Number(round(Number.parseInt(String(windDirection)) / 45));
  return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'][direction];
};

export default getCompassDirection;