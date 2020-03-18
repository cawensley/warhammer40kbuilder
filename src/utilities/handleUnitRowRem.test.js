import handleInitialArmy from './handleInitialArmy';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';
import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import SquadsChange from '../Redux/actions/SquadsChange';
import CodexChange from '../Redux/actions/CodexChange';
import UnitsChange from '../Redux/actions/UnitsChange';
import EquipmentChange from '../Redux/actions/EquipmentChange';
import handleEquipmentRowAdd from './handleEquipmentRowAdd';
import handleUnitRowRem from './handleUnitRowRem';
import handleUnitRowAdd from './handleUnitRowAdd';

const mockSquad = [{
  id: 'TigerSquad', Codex: 'zzzzzzz', Name: 'PirateSquad11', Role: '111111', MinSize: 1, MaxSize: 5, Units: ['TigerLeader'],
}];
const mockUnit = [{ id: 'TigerLeader', Name: 'PirateSquad11', Gear: ['33333', '44444'] }];
const mockEquipment = [{ id: '33333', Name: 'mockSword' }, { id: '44444', Name: 'mockGun' }];
const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'TigerSquad',
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: '33333',
};
const mockRoles = [{ id: '111111', Name: 'HQ', SortOrder: 0 }];
const mockCodex = 'zzzzzzz';

describe('Function tests', () => {
  beforeEach(() => {
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(CodexChange(mockCodex));
    handleInitialArmy();
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(UnitsChange(mockUnit));
    store.dispatch(EquipmentChange(mockEquipment));
  });
  test('UnitRowRem function properly removes Unit with their equipment on Click', () => {
    handleEquipmentRowAdd(0, 0);
    handleUnitRowAdd(0, 0);
    handleUnitRowRem(0, 0);
    expect(store.getState().army.SquadArray[0].Squads.length).toBe(1);
  });
});
