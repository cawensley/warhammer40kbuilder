import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../ArmySquadRowAdd/ArmySquadRowAdd';
import RolesChange from '../RolesChange/RolesChange';
import ArmyUnitChoice from './ArmyUnitChoice';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

const mockPayload = { roleIndex: 0, rowIndex: 0, UnitID: 'CoolPirate' };

test('Redux Action ArmyUnitChoice is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  store.dispatch(ArmyUnitChoice(mockPayload));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads[0].Unit).toBe('CoolPirate');
});
