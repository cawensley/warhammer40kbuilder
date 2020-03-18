import findPreviousUnit from './findPreviousUnit';
import store from '../Redux/store';
import ArmyEquipmentRowAdd from '../Redux/actions/ArmyEquipmentRowAdd';

export default function handleEquipmentRowAdd(roleIndex, rowIndex) {
  const firstEquipID = findPreviousUnit(roleIndex, rowIndex)[0].Gear[0];
  store.dispatch(ArmyEquipmentRowAdd({
    roleIndex, rowIndex, firstEquipID,
  }));
}
