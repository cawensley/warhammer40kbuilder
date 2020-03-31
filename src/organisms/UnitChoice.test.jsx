import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import handleInitialArmy from '../utilities/handleInitialArmy';
import store from '../Redux/store';
import {
  RolesChange, UnitsChange, SquadsChange, ArmyUnitChoice, ArmySquadRowAdd,
} from '../Redux/actions/index';
import UnitChoice from './UnitChoice';
import {
  mockSquad2, mockSquad, mockUnit, mockRowAdd, mockRoles,
} from '../utilities/mockConstants';

const setup = (rowIndex, roleIndex) => shallow(<UnitChoice
  roleIndex={roleIndex}
  rowIndex={rowIndex}
/>);

describe('testing UnitChoice.jsx with proper redux data loaded', () => {
  beforeEach(() => {
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(UnitsChange(mockUnit));
    handleInitialArmy();
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
  });

  test('it should render', () => {
    store.dispatch(SquadsChange(mockSquad2));
    const wrapper = setup(0, 0);
    const component = findByTestAttr(wrapper, 'selectInput');

    expect(component.length).toBe(1);
  });

  test('Unit options changes state of redux on change', () => {
    store.dispatch(SquadsChange(mockSquad));
    const wrapper = setup(0, 0);
    const selectInput = findByTestAttr(wrapper, 'selectInput');
    selectInput.simulate('change', { target: { value: 'TheBiggestUnitEver' } });

    expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe('TheBiggestUnitEver');
  });

  test('Test UseEffect does not set Unit Choice to [0]', () => {
    store.dispatch(SquadsChange(mockSquad));
    React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    setup(0, 0);

    expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe('TigerLeader');
  });

  test('Test UseEffect sets Unit Choice to [0]', () => {
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(ArmyUnitChoice({ roleIndex: 0, rowIndex: 0, UnitID: '55555' }));
    React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    setup(0, 0);

    expect(store.getState().army.SquadArray[0].Squads[0].Unit).toBe('TigerLeader');
  });
});
