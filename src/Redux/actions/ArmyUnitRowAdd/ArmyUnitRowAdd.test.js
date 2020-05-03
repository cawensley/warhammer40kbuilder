import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import RolesChange from '../RolesChange/RolesChange';
import ArmyUnitRowAdd from './ArmyUnitRowAdd';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

test('Redux Action ArmyUnitRowAdd is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyUnitRowAdd(mockRowAdd));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads[0].Unit).toBe('TigerLeader');
});
