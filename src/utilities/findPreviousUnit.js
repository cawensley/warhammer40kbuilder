import store from '../Redux/store';

function findPreviousUnit(roleIndex, rowIndex) {
  let unitObject;
  for (let i = rowIndex; i >= 0; i -= 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Unit !== null) {
      const unitID = store.getState().army.SquadArray[roleIndex].Squads[i].Unit;
      unitObject = store.getState().units.filter((unit) => unit.id === unitID);
      break;
    }
  }
  return unitObject;
}

export default findPreviousUnit;
