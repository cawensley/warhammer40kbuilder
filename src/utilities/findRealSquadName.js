import store from '../Redux/store';

export default function findRealSquadName(input) {
  const realSquad = store.getState().squads.filter((data) => data.id.includes(input));
  if (realSquad.length > 0) { return realSquad[0].Name; }
  return input;
}
