import findPreviousSquad from './findPreviousSquad';
import store from '../Redux/store';
import ArmyUnitRowAdd from '../Redux/actions/ArmyUnitRowAdd';

export default function handleUnitRowAdd(roleIndex, rowIndex) {
  const referenceSquad = findPreviousSquad(roleIndex, rowIndex)[0];
  if (referenceSquad.Units.length > 0) {
    const firstUnitID = referenceSquad.Units[0];
    const firstUnitQTY = referenceSquad.MinSize;
    const firstEquipID = store.getState().units
      .filter((data) => data.id.includes(firstUnitID))[0].Gear[0];
    let spliceIndex = rowIndex;
    for (let i = rowIndex + 1;
      i < store.getState().army.SquadArray[roleIndex].Squads.length;
      i += 1) {
      if (store.getState().army.SquadArray[roleIndex].Squads[i].Unit === null) {
        spliceIndex = i;
      } else { break; }
    }
    spliceIndex += 1;
    store.dispatch(ArmyUnitRowAdd({
      roleIndex, spliceIndex, firstUnitQTY, firstUnitID, firstEquipID,
    }));
  }
}
