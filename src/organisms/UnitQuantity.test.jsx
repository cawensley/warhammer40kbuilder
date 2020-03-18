import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import handleInitialArmy from '../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';
import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import UnitsChange from '../Redux/actions/UnitsChange';
import SquadsChange from '../Redux/actions/SquadsChange';
import UnitQuantity from './UnitQuantity';
import ArmyUnitQTYChange from '../Redux/actions/ArmyUnitQTYChange';

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
  firstUnitQTY: 2,
  firstUnitID: 'TigerUnit',
  firstEquipID: '33333',
};
const mockRoles = [{ id: '111111', Name: 'HQ', SortOrder: 0 }];
const mockSetChoices = jest.fn();

const setup = (rowIndex, roleIndex, choices) => {
  jest.clearAllMocks();
  React.useState = jest.fn(() => [choices, mockSetChoices]);
  return shallow(<UnitQuantity
    roleIndex={roleIndex}
    rowIndex={rowIndex}
  />);
};

beforeEach(() => {
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(UnitsChange(mockUnit));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
});
test('it should render', () => {
  store.dispatch(SquadsChange(mockSquad1));
  const wrapper = setup(0, 0, []);
  const component = findByTestAttr(wrapper, 'selectInput');
  expect(component.length).toBe(1);
});
test('Unit Quantity changes state of redux on change', () => {
  store.dispatch(SquadsChange(mockSquad2));
  const wrapper = setup(0, 0, [1, 2, 3, 4, 5]);
  const selectInput = findByTestAttr(wrapper, 'selectInput');
  selectInput.simulate('change', { target: { value: 3 } });
  expect(store.getState().army.SquadArray[0].Squads[0].UnitQTY).toBe(3);
});
test('Test UseEffect does not set UnitQTY Choice to [0]', () => {
  store.dispatch(SquadsChange(mockSquad2));
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup(0, 0, [1, 2, 3, 4, 5]);
  expect(store.getState().army.SquadArray[0].Squads[0].UnitQTY).toBe(2);
});
test('Test UseEffect sets Unit Choice to [0]', () => {
  store.dispatch(SquadsChange(mockSquad2));
  store.dispatch(ArmyUnitQTYChange({ roleIndex: 0, rowIndex: 0, UnitQTY: 9 }));
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup(0, 0, [1, 2, 3, 4, 5]);
  expect(store.getState().army.SquadArray[0].Squads[0].UnitQTY).toBe(1);
});
