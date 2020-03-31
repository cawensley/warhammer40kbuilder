import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import RolesChange from '../RolesChange/RolesChange';
import ArmySquadRowAdd from './ArmySquadRowAdd';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

test('Redux Action ArmySquadRowAdd is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads[0].Equipment).toBe('33333');
});
