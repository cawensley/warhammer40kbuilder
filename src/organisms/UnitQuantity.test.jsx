import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import handleInitialArmy from '../utilities/handleInitialArmy';
import store from '../Redux/store';
import {
  RolesChange, UnitsChange, SquadsChange, ArmyUnitQTYChange, ArmySquadRowAdd,
} from '../Redux/actions/index';
import UnitQuantity from './UnitQuantity';
import {
  mockSquad, mockSquad2, mockUnit, mockRowAdd, mockRoles,
} from '../utilities/mockConstants';

const mockSetChoices = jest.fn();

const setup = (rowIndex, roleIndex, choices) => {
  jest.clearAllMocks();
  React.useState = jest.fn(() => [choices, mockSetChoices]);
  return shallow(<UnitQuantity
    roleIndex={roleIndex}
    rowIndex={rowIndex}
  />);
};
describe('testing UnitQuantity.jsx with proper redux data loaded', () => {
  beforeEach(() => {
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(UnitsChange(mockUnit));
    handleInitialArmy();
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
  });

  test('it should render', () => {
    store.dispatch(SquadsChange(mockSquad2));
    const wrapper = setup(0, 0, []);
    const component = findByTestAttr(wrapper, 'selectInput');

    expect(component.length).toBe(1);
  });

  test('Unit Quantity changes state of redux on change', () => {
    store.dispatch(SquadsChange(mockSquad));
    const wrapper = setup(0, 0, [1, 2, 3, 4, 5]);
    const selectInput = findByTestAttr(wrapper, 'selectInput');
    selectInput.simulate('change', { target: { value: 3 } });

    expect(store.getState().army.SquadArray[0].Squads[0].UnitQTY).toBe(3);
  });

  test('Test UseEffect does not set UnitQTY Choice to 1', () => {
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(ArmyUnitQTYChange({ roleIndex: 0, rowIndex: 0, UnitQTY: 2 }));
    React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    setup(0, 0, [1, 2, 3, 4, 5]);

    expect(store.getState().army.SquadArray[0].Squads[0].UnitQTY).toBe(2);
  });

  test('Test UseEffect sets Unit Choice to 1', () => {
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(ArmyUnitQTYChange({ roleIndex: 0, rowIndex: 0, UnitQTY: 9 }));
    React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    setup(0, 0, [1, 2, 3, 4, 5]);

    expect(store.getState().army.SquadArray[0].Squads[0].UnitQTY).toBe(1);
  });
});
