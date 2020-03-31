import store from '../Redux/store';
import { findPreviousUnit } from './findPrevious';
import {
  mockCodex, mockRoles, mockRowAdd, mockSquad2, mockUser,
} from './mockConstants';
import handleInitialArmy from './handleInitialArmy';
import {
  ArmySquadRowAdd, ArmyUnitChoice, CodexChange, RolesChange, SquadsChange, UserChange,
} from '../Redux/actions';

const mockUnitPayload = { roleIndex: 0, rowIndex: 0, UnitID: undefined };

test('FindPrevious returns empty Gear Array when no unit is found in database', () => {
  store.dispatch(UserChange(mockUser));
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(CodexChange(mockCodex));
  store.dispatch(SquadsChange(mockSquad2));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  store.dispatch(ArmyUnitChoice(mockUnitPayload));
  const UnitFound = findPreviousUnit(0, 0);

  expect(UnitFound.Gear.length).toBe(0);
});
