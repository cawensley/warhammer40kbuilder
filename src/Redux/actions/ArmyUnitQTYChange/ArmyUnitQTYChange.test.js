import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import RolesChange from '../RolesChange/RolesChange';
import ArmyUnitRowAdd from '../ArmyUnitRowAdd/ArmyUnitRowAdd';
import ArmyUnitQTYChange from './ArmyUnitQTYChange';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

const mockPayload = { roleIndex: 0, rowIndex: 0, UnitQTY: 250 };

test('Redux Action ArmyUnitQTYChange is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmyUnitRowAdd(mockRowAdd));
  store.dispatch(ArmyUnitQTYChange(mockPayload));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads[0].UnitQTY).toBe(250);
});
