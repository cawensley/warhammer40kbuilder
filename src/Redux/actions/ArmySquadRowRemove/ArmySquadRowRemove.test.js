import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import RolesChange from '../RolesChange/RolesChange';
import ArmySquadRowAdd from '../ArmySquadRowAdd/ArmySquadRowAdd';
import ArmySquadRowRemove from './ArmySquadRowRemove';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

test('Redux Action ArmySquadRowRemove is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  store.dispatch(ArmySquadRowRemove({ roleIndex: 0, popNumber: 1 }));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads.length).toBe(0);
});
