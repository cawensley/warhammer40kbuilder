import store from '../store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import RolesChange from './RolesChange';
import ArmyEquipmentRowAdd from './ArmyEquipmentRowAdd';

const mockRowAdd = { roleIndex: 0, rowIndex: 0, firstEquipID: 'PirateSword' };
const mockRole = [{ id: '99999', Name: 'BestRole' }];

test('Redux Action ArmyEquipmentRowAdd is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyEquipmentRowAdd(mockRowAdd));
  const ArmyState = store.getState().army.SquadArray;
  expect(ArmyState[0].Squads[0].Equipment).toBe('PirateSword');
});
