import store from '../Redux/store';

export function findRealSquadName(input) {
  const realSquad = store.getState().squads.filter((data) => data.id.includes(input));
  if (realSquad.length > 0) { return realSquad[0].Name; }
  return input;
}

export function findRealEquipmentName(input) {
  const realEquipment = store.getState().equipment.filter((data) => data.id.includes(input));
  if (realEquipment.length > 0) { return realEquipment[0].Name; }
  return input;
}

export function findRealUnitName(input) {
  const realUnit = store.getState().units.filter((data) => data.id.includes(input));
  if (realUnit.length > 0) { return realUnit[0].Name; }
  return input;
}
