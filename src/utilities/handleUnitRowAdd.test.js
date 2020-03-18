import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import handleInitialArmy from './handleInitialArmy';
import handleUnitRowAdd from './handleUnitRowAdd';
import CodexChange from '../Redux/actions/CodexChange';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';
import SquadsChange from '../Redux/actions/SquadsChange';
import UnitsChange from '../Redux/actions/UnitsChange';
import EquipmentChange from '../Redux/actions/EquipmentChange';

const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'TigerSquad',
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: '33333',
};
const mockRoles = [{ id: '111111', Name: 'HQ', SortOrder: 0 }];
const mockCodex = 'zzzzzzz';
const mockSquad = [{
  id: 'TigerSquad', Codex: 'zzzzzzz', Name: 'PirateSquad11', Role: '111111', MinSize: 1, MaxSize: 5, Units: [],
}];
const mockEquipment = [{ id: '33333', Name: 'mockSword' }, { id: '44444', Name: 'mockGun' }];
const mockUnit = [{ id: 'TigerLeader', Name: 'PirateSquad11', Gear: ['33333', '44444'] }];

test('Nothing is added with no unit available', () => {
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(CodexChange(mockCodex));
  handleInitialArmy();
  store.dispatch(SquadsChange(mockSquad));
  store.dispatch(UnitsChange(mockUnit));
  store.dispatch(EquipmentChange(mockEquipment));
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  handleUnitRowAdd(0, 0);
  expect(store.getState().army.SquadArray[0].Squads.length).toBe(1);
});
