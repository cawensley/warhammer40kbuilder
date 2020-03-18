import store from '../Redux/store';
import ArmySquadRowRem from '../Redux/actions/ArmySquadRowRem';

export default function handleSquadRowRem(roleIndex) {
  let popNumber = 1;
  for (let i = store.getState().army.SquadArray[roleIndex].Squads.length - 1; i >= 0; i -= 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Squad === null) {
      popNumber += 1;
    } else { break; }
  }
  store.dispatch(ArmySquadRowRem({ roleIndex, popNumber }));
}
