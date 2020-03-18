import store from '../store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import RolesChange from './RolesChange';
import ArmyEquipmentRowAdd from './ArmyEquipmentRowAdd';
import ArmyEquipmentRowRem from './ArmyEquipmentRowRem';

const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: null,
  firstUnitQTY: null,
  firstUnitID: null,
  firstEquipID: 'TigerLeaderPaw',
};

const mockRole = [{ id: '99999', Name: 'BestRole' }];

test('Redux Action ArmyEquipmentRowRem is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyEquipmentRowAdd(mockRowAdd));
  store.dispatch(ArmyEquipmentRowRem({ roleIndex: 0, rowIndex: 0 }));
  const ArmyState = store.getState().army.SquadArray;
  expect(ArmyState[0].Squads.length).toBe(0);
});
