import store from '../store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import RolesChange from './RolesChange';
import ArmySquadRowAdd from './ArmySquadRowAdd';
import ArmySquadRowRem from './ArmySquadRowRem';

const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'Chupacabra',
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: 'TigerLeaderPaw',
};

const mockRole = [{ id: '99999', Name: 'BestRole' }];

test('Redux Action ArmySquadRowRem is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  store.dispatch(ArmySquadRowRem({ roleIndex: 0, popNumber: 1 }));
  const ArmyState = store.getState().army.SquadArray;
  expect(ArmyState[0].Squads.length).toBe(0);
});
