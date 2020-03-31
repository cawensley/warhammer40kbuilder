import store from '../Redux/store';

export function findPreviousSquad(roleIndex, rowIndex) {
  let squadObject;
  for (let i = rowIndex; i >= 0; i -= 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Squad !== null) {
      const squadID = store.getState().army.SquadArray[roleIndex].Squads[i].Squad;
      [squadObject] = store.getState().squads.filter((squad) => squad.id === squadID);
      break;
    }
  }
  return squadObject;
}

export function findPreviousUnit(roleIndex, rowIndex) {
  let unitObject;
  for (let i = rowIndex; i >= 0; i -= 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Unit === undefined) {
      unitObject = { Gear: [] };
      break;
    }
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Unit !== null) {
      const unitID = store.getState().army.SquadArray[roleIndex].Squads[i].Unit;
      [unitObject] = store.getState().units.filter((unit) => unit.id === unitID);
      break;
    }
  }
  return unitObject;
}
