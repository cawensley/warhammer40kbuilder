import handleInitialArmy from './handleInitialArmy';
import store from '../Redux/store';
import {
  RolesChange, SquadsChange, CodexChange, UnitsChange, EquipmentChange, ArmySquadRowAdd,
} from '../Redux/actions/index';
import { handleEquipmentRowAdd, handleUnitRowAdd } from './handleRowAdd';
import { handleUnitRowRemove } from './handleRowRemove';
import {
  mockSquad, mockUnit, mockEquipment, mockRowAdd, mockRoles, mockCodex,
} from './mockConstants';

test('UnitRowRem function properly removes Unit with their equipment on Click', () => {
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(CodexChange(mockCodex));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  store.dispatch(SquadsChange(mockSquad));
  store.dispatch(UnitsChange(mockUnit));
  store.dispatch(EquipmentChange(mockEquipment));
  handleEquipmentRowAdd(0, 0);
  handleUnitRowAdd(0, 0);
  handleUnitRowRemove(0, 0);

  expect(store.getState().army.SquadArray[0].Squads.length).toBe(1);
});
