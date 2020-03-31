import store from '../Redux/store';

export default function findUnitAbilities(input) {
  const realAbilities = store.getState().units.filter((data) => data.id.includes(input));
  if (realAbilities.length > 0) { return realAbilities[0].Abilities; }
  return input;
}
