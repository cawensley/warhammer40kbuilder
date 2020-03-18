import store from '../store';
import ArmyEquipmentChoice from './ArmyEquipmentChoice';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import ArmySquadRowAdd from './ArmySquadRowAdd';
import RolesChange from './RolesChange';

const mockRowAdd = { roleIndex: 0, rowIndex: 0 };
const mockPayload = { roleIndex: 0, rowIndex: 0, EquipmentID: 'PirateSword' };
const mockRole = [{ id: '99999', Name: 'BestRole' }];

test('Redux Action ArmyEquipmentChoice is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  store.dispatch(ArmyEquipmentChoice(mockPayload));
  const ArmyState = store.getState().army.SquadArray;
  expect(ArmyState[0].Squads[0].Equipment).toBe('PirateSword');
});
