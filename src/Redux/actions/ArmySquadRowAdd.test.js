import store from '../store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import RolesChange from './RolesChange';
import ArmySquadRowAdd from './ArmySquadRowAdd';

const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'Tiger',
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: 'TigerLeaderPaw',
};

const mockRole = [{ id: '99999', Name: 'BestRole' }];

test('Redux Action ArmySquadRowAdd is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  const ArmyState = store.getState().army.SquadArray;
  expect(ArmyState[0].Squads[0].Equipment).toBe('TigerLeaderPaw');
});
