import store from '../Redux/store';

export default function findRealUnitName(input) {
  const realUnit = store.getState().units.filter((data) => data.id.includes(input));
  if (realUnit.length > 0) { return realUnit[0].Name; }
  return input;
}
