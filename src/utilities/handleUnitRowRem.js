import store from '../Redux/store';
import ArmyUnitRowRem from '../Redux/actions/ArmyUnitRowRem';

export default function handleUnitRowRem(roleIndex, rowIndex) {
  let spliceNumber = 1;
  for (let i = rowIndex + 1;
    i < store.getState().army.SquadArray[roleIndex].Squads.length;
    i += 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Unit === null) {
      spliceNumber += 1;
    } else { break; }
  }
  store.dispatch(ArmyUnitRowRem({ roleIndex, rowIndex, spliceNumber }));
}
