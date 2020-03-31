import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import EquipmentChoice from './EquipmentChoice';
import handleInitialArmy from '../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd/ArmySquadRowAdd';
import store from '../Redux/store';
import {
  RolesChange, UnitsChange, EquipmentChange, ArmyEquipmentChoice,
} from '../Redux/actions/index';
import {
  mockUnit, mockRowAdd, mockRoles, mockEquipment, mockUnit2,
} from '../utilities/mockConstants';

const setup = (rowIndex, roleIndex) => shallow(<EquipmentChoice
  roleIndex={roleIndex}
  rowIndex={rowIndex}
/>);

describe('testing EquipmentChoice.jsx with proper redux data loaded', () => {
  beforeEach(() => {
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(EquipmentChange(mockEquipment));
    handleInitialArmy();
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
  });

  test('it shouldnt render', () => {
    store.dispatch(UnitsChange(mockUnit2));
    const wrapper = setup(0, 0);
    const component = findByTestAttr(wrapper, 'selectInput');

    expect(component.length).toBe(0);
  });

  test('it should render', () => {
    store.dispatch(UnitsChange(mockUnit));
    const wrapper = setup(0, 0);
    const component = findByTestAttr(wrapper, 'selectInput');

    expect(component.length).toBe(1);
  });

  test('Equipment options changes state of redux on change', () => {
    store.dispatch(UnitsChange(mockUnit));
    const wrapper = setup(0, 0);
    const selectInput = findByTestAttr(wrapper, 'selectInput');
    selectInput.simulate('change', { target: { value: 'BiggestAxeEver' } });

    expect(store.getState().army.SquadArray[0].Squads[0].Equipment).toBe('BiggestAxeEver');
  });

  test('Test UseEffect does not set Equipment Choice to [0]', () => {
    store.dispatch(UnitsChange(mockUnit));
    React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    setup(0, 0);

    expect(store.getState().army.SquadArray[0].Squads[0].Equipment).toBe('33333');
  });

  test('Test UseEffect sets Equipment Choice to [0]', () => {
    store.dispatch(UnitsChange(mockUnit));
    store.dispatch(ArmyEquipmentChoice({ roleIndex: 0, rowIndex: 0, EquipmentID: '55555' }));
    React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    setup(0, 0);

    expect(store.getState().army.SquadArray[0].Squads[0].Equipment).toBe('33333');
  });

  test('Test UseEffect sets Equipment Choice to undefined if no choices', () => {
    store.dispatch(UnitsChange(mockUnit2));
    store.dispatch(ArmyEquipmentChoice({ roleIndex: 0, rowIndex: 0, EquipmentID: '55555' }));
    React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    setup(0, 0);

    expect(store.getState().army.SquadArray[0].Squads[0].Equipment).toBe(undefined);
  });
});
