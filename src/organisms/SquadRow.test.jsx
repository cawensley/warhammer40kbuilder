import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import handleInitialArmy from '../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';
import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import SquadsChange from '../Redux/actions/SquadsChange';
import CodexChange from '../Redux/actions/CodexChange';
import SquadRow from './SquadRow';
import UnitsChange from '../Redux/actions/UnitsChange';
import EquipmentChange from '../Redux/actions/EquipmentChange';
import handleUnitRowAdd from '../utilities/handleUnitRowAdd';
import handleEquipmentRowAdd from '../utilities/handleEquipmentRowAdd';

Enzyme.configure({ adapter: new EnzymeAdapter() });

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

const setup = (roleIndex) => mount(<SquadRow
  roleIndex={roleIndex}
/>);

test('Page shouldnt render without data', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'SquadRow');
  expect(component.length).toBe(0);
});
test('renders Page but no data', () => {
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(CodexChange(mockCodex));
  handleInitialArmy();
  const wrapper = setup(0);
  const component = findByTestAttr(wrapper, 'SquadRow');
  expect(component.length).toBe(1);
});

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
  test('SquadRowAdd function gets called on click', () => {
    const wrapper = setup(0);
    const ButtonAdd = findByTestAttr(wrapper, 'SquadRowAdd');
    ButtonAdd.simulate('click', { preventDefault() {} });
    expect(store.getState().army.SquadArray[0].Squads[1].Squad).toBe('TigerSquad');
  });
  test('SquadRowRem function gets called on click', () => {
    const wrapper = setup(0);
    const ButtonAdd = findByTestAttr(wrapper, 'EquipRowAdd');
    ButtonAdd.simulate('click', { preventDefault() {} });
    const ButtonRem = findByTestAttr(wrapper, 'SquadRowRem');
    ButtonRem.simulate('click', { preventDefault() {} });
    expect(store.getState().army.SquadArray[0].Squads.length).toBe(0);
  });
  test('UnitRowAdd function gets called on Click', () => {
    const wrapper = setup(0);
    const ButtonAdd = findByTestAttr(wrapper, 'UnitRowAdd');
    ButtonAdd.simulate('click', { preventDefault() {} });
    ButtonAdd.simulate('click', { preventDefault() {} });
    expect(store.getState().army.SquadArray[0].Squads[1].Unit).toBe('TigerLeader');
  });
  test('UnitRowRem function gets called on Click', () => {
    handleUnitRowAdd(0, 0);
    const wrapper = setup(0);
    const ButtonRem = findByTestAttr(wrapper, 'UnitRowRem');
    ButtonRem.simulate('click', { preventDefault() {} });
    expect(store.getState().army.SquadArray[0].Squads.length).toBe(1);
  });
  test('EquipmentRowAdd function gets called on Click', () => {
    const wrapper = setup(0);
    const ButtonAdd = findByTestAttr(wrapper, 'EquipRowAdd');
    ButtonAdd.simulate('click', { preventDefault() {} });
    expect(store.getState().army.SquadArray[0].Squads[1].Equipment).toBe('33333');
  });
  test('EquipmentRowRem function gets called on Click', () => {
    handleEquipmentRowAdd(0, 0);
    const wrapper = setup(0);
    const ButtonRem = findByTestAttr(wrapper, 'EquipRowRem');
    ButtonRem.simulate('click', { preventDefault() {} });
    expect(store.getState().army.SquadArray[0].Squads.length).toBe(1);
  });
});
