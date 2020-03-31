import store from '../Redux/store';
import { handleSquadRowAdd, handleUnitRowAdd } from './handleRowAdd';
import handleInitialArmy from './handleInitialArmy';
import {
  CodexChange, SquadsChange, UnitsChange, EquipmentChange, ArmySquadRowAdd, RolesChange,
} from '../Redux/actions/index';
import {
  mockRoles, mockRowAdd, mockCodex, mockUnit2, mockSquad2, mockSquad, mockEquipment, mockUnit,
} from './mockConstants';

describe('testing various outcomes of addRow functions', () => {
  beforeEach(() => {
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(CodexChange(mockCodex));
    store.dispatch(EquipmentChange(mockEquipment));
    handleInitialArmy();
  });

  test('Nothing is added with no squad available', () => {
    handleSquadRowAdd(0);

    expect(store.getState().army.SquadArray[0].Squads.length).toBe(0);
  });

  test('Unit is added when Squad has units', () => {
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(UnitsChange(mockUnit));
    handleSquadRowAdd(0);

    expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe('TigerLeader');
  });

  test('Unit is empty when Squad doesnt have units', () => {
    store.dispatch(SquadsChange(mockSquad2));
    store.dispatch(UnitsChange(mockUnit));
    handleSquadRowAdd(0);

    expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe(undefined);
  });

  test('No row is added with no unit available in Squad Array', () => {
    store.dispatch(SquadsChange(mockSquad2));
    store.dispatch(UnitsChange(mockUnit));
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
    handleUnitRowAdd(0, 0);

    expect(store.getState().army.SquadArray[0].Squads.length).toBe(1);
  });

  test('No Equipment is added if Unit doesnt have it', () => {
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(UnitsChange(mockUnit2));
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
    handleUnitRowAdd(0, 0);

    expect(store.getState().army.SquadArray[0].Squads[0].Gear).toBe(undefined);
  });
});
