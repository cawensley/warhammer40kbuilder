import store from '../Redux/store';
import ArmyEquipmentRowRem from '../Redux/actions/ArmyEquipmentRowRem';

export default function handleEquipmentRowRem(roleIndex, rowIndex) {
  store.dispatch(ArmyEquipmentRowRem({ roleIndex, rowIndex }));
}
