import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import RolesChange from '../RolesChange/RolesChange';
import ArmyUnitRowAdd from '../ArmyUnitRowAdd/ArmyUnitRowAdd';
import ArmyUnitRowRemove from './ArmyUnitRowRemove';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

test('Redux Action ArmyUnitRowRemove is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyUnitRowAdd(mockRowAdd));
  store.dispatch(ArmyUnitRowRemove({ roleIndex: 0, rowIndex: 0, spliceNumber: 1 }));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads.length).toBe(0);
});
