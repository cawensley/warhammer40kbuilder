import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import handleInitialArmy from '../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';
import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import UnitsChange from '../Redux/actions/UnitsChange';
import UnitChoice from './UnitChoice';
import SquadsChange from '../Redux/actions/SquadsChange';
import ArmyUnitChoice from '../Redux/actions/ArmyUnitChoice';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockSquad1 = [{
  id: 'TigerSquad', Name: 'PirateSquad11', MinSize: 1, MaxSize: 5, Units: [],
}];
const mockSquad2 = [{
  id: 'TigerSquad', Name: 'PirateSquad11', MinSize: 1, MaxSize: 5, Units: ['TigerUnit'],
}];
const mockUnit = [{
  id: 'TigerUnit', Name: 'PirateUnit11', Cost: 10, Gear: ['33333', '44444'],
}];
const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'TigerSquad',
  firstUnitQTY: 1,
  firstUnitID: 'TigerUnit',
  firstEquipID: '33333',
};
const mockRoles = [{ id: '111111', Name: 'HQ', SortOrder: 0 }];

const setup = (rowIndex, roleIndex) => shallow(<UnitChoice
  roleIndex={roleIndex}
  rowIndex={rowIndex}
/>);

beforeEach(() => {
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(UnitsChange(mockUnit));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
});
test('it should render', () => {
  store.dispatch(SquadsChange(mockSquad1));
  const wrapper = setup(0, 0);
  const component = findByTestAttr(wrapper, 'selectInput');
  expect(component.length).toBe(1);
});
test('Unit options changes state of redux on change', () => {
  store.dispatch(SquadsChange(mockSquad2));
  const wrapper = setup(0, 0);
  const selectInput = findByTestAttr(wrapper, 'selectInput');
  selectInput.simulate('change', { target: { value: 'TheBiggestUnitEver' } });
  expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe('TheBiggestUnitEver');
});
test('Test UseEffect does not set Unit Choice to [0]', () => {
  store.dispatch(SquadsChange(mockSquad2));
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup(0, 0);
  expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe('TigerUnit');
});
test('Test UseEffect sets Unit Choice to [0]', () => {
  store.dispatch(SquadsChange(mockSquad2));
  store.dispatch(ArmyUnitChoice({ roleIndex: 0, rowIndex: 0, UnitID: '55555' }));
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup(0, 0);
  expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe('TigerUnit');
});
