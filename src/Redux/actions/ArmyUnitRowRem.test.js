import store from '../store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import RolesChange from './RolesChange';
import ArmyUnitRowAdd from './ArmyUnitRowAdd';
import ArmyUnitRowRem from './ArmyUnitRowRem';

const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: null,
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: 'TigerLeaderPaw',
};

const mockRole = [{ id: '99999', Name: 'BestRole' }];

test('Redux Action ArmyUnitRowRem is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyUnitRowAdd(mockRowAdd));
  store.dispatch(ArmyUnitRowRem({ roleIndex: 0, rowIndex: 0, spliceNumber: 1 }));
  const ArmyState = store.getState().army.SquadArray;
  expect(ArmyState[0].Squads.length).toBe(0);
});
