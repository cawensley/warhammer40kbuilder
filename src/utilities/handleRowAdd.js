import store from '../Redux/store';
import codexFilter from './codexFilter';
import { findPreviousSquad, findPreviousUnit } from './findPrevious';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd/ArmySquadRowAdd';
import ArmyUnitRowAdd from '../Redux/actions/ArmyUnitRowAdd/ArmyUnitRowAdd';
import ArmyEquipmentRowAdd from '../Redux/actions/ArmyEquipmentRowAdd/ArmyEquipmentRowAdd';

export function handleSquadRowAdd(roleIndex) {
  const roleID = store.getState().roles[roleIndex].id;
  const firstSquad = (codexFilter(store.getState().squads))
    .filter((squad) => squad.Role === roleID);
  if (firstSquad.length > 0) {
    const firstSquadID = firstSquad[0].id;
    const firstUnitQTY = firstSquad[0].MinSize;
    let firstUnitID;
    if (firstSquad[0].Units.length > 0) {
      [firstUnitID] = firstSquad[0].Units;
    }
    let firstEquipID;
    if (firstUnitID !== undefined) {
      if (store.getState().units
        .filter((data) => data.id.includes(firstUnitID))[0].Gear.length > 0) {
        [firstEquipID] = store.getState().units
          .filter((data) => data.id.includes(firstUnitID))[0].Gear;
      }
    }
    store.dispatch(ArmySquadRowAdd({
      roleIndex, firstSquadID, firstUnitQTY, firstUnitID, firstEquipID,
    }));
  }
}

export function handleUnitRowAdd(roleIndex, rowIndex) {
  const referenceSquad = findPreviousSquad(roleIndex, rowIndex);
  if (referenceSquad.Units.length > 0) {
    const firstUnitID = referenceSquad.Units[0];
    const firstUnitQTY = referenceSquad.MinSize;
    let firstEquipID = null;
    if (store.getState().units
      .filter((data) => data.id.includes(firstUnitID))[0].Gear.length > 0) {
      [firstEquipID] = store.getState().units
        .filter((data) => data.id.includes(firstUnitID))[0].Gear;
    }
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

export function handleEquipmentRowAdd(roleIndex, rowIndex) {
  let firstEquipID = null;
  if (findPreviousUnit(roleIndex, rowIndex).Gear.length > 0) {
    [firstEquipID] = findPreviousUnit(roleIndex, rowIndex).Gear;
  }
  store.dispatch(ArmyEquipmentRowAdd({
    roleIndex, rowIndex, firstEquipID,
  }));
}
