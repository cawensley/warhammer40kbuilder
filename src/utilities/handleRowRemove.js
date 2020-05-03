import store from '../Redux/store';
import ArmySquadRowRemove from '../Redux/actions/ArmySquadRowRemove/ArmySquadRowRemove';
import ArmyUnitRowRemove from '../Redux/actions/ArmyUnitRowRemove/ArmyUnitRowRemove';
import ArmyEquipmentRowRemove from '../Redux/actions/ArmyEquipmentRowRemove/ArmyEquipmentRowRemove';

export function handleSquadRowRemove(roleIndex) {
  let popNumber = 1;
  for (let i = store.getState().army.SquadArray[roleIndex].Squads.length - 1; i >= 0; i -= 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Squad === null) {
      popNumber += 1;
    } else { break; }
  }
  store.dispatch(ArmySquadRowRemove({ roleIndex, popNumber }));
}

export function handleUnitRowRemove(roleIndex, rowIndex) {
  let spliceNumber = 1;
  for (let i = rowIndex + 1;
    i < store.getState().army.SquadArray[roleIndex].Squads.length;
    i += 1) {
    if (store.getState().army.SquadArray[roleIndex].Squads[i].Unit === null) {
      spliceNumber += 1;
    } else { break; }
  }
  store.dispatch(ArmyUnitRowRemove({ roleIndex, rowIndex, spliceNumber }));
}

export function handleEquipmentRowRemove(roleIndex, rowIndex) {
  store.dispatch(ArmyEquipmentRowRemove({ roleIndex, rowIndex }));
}
