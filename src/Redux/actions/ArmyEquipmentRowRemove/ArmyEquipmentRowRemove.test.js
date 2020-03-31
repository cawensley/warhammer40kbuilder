import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import RolesChange from '../RolesChange/RolesChange';
import ArmyEquipmentRowAdd from '../ArmyEquipmentRowAdd/ArmyEquipmentRowAdd';
import ArmyEquipmentRowRemove from './ArmyEquipmentRowRemove';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

test('Redux Action ArmyEquipmentRowRemove is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyEquipmentRowAdd(mockRowAdd));
  store.dispatch(ArmyEquipmentRowRemove({ roleIndex: 0, rowIndex: 0 }));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads.length).toBe(0);
});
