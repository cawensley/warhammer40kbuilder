import store from '../store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import RolesChange from './RolesChange';
import ArmyUnitRowAdd from './ArmyUnitRowAdd';

const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: null,
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: 'TigerLeaderPaw',
};

const mockRole = [{ id: '99999', Name: 'BestRole' }];

test('Redux Action ArmyUnitRowAdd is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyUnitRowAdd(mockRowAdd));
  const ArmyState = store.getState().army.SquadArray;
  expect(ArmyState[0].Squads[0].Unit).toBe('TigerLeader');
});
