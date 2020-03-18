import store from '../Redux/store';

function findPreviousSquad(roleIndex, rowIndex) {
  let squadObject;
  for (let i = rowIndex; i >= 0; i -= 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Squad !== null) {
      const squadID = store.getState().army.SquadArray[roleIndex].Squads[i].Squad;
      squadObject = store.getState().squads.filter((squad) => squad.id === squadID);
      break;
    }
  }
  return squadObject;
}

export default findPreviousSquad;
