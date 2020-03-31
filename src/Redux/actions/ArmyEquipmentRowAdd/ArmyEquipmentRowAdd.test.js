import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import RolesChange from '../RolesChange/RolesChange';
import ArmyEquipmentRowAdd from './ArmyEquipmentRowAdd';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

test('Redux Action ArmyEquipmentRowAdd is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyEquipmentRowAdd(mockRowAdd));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads[0].Equipment).toBe('33333');
});
