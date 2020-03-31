import React from 'react';
import { mount, findByTestAttr } from '../utilities/setupTests';
import handleInitialArmy from '../utilities/handleInitialArmy';
import store from '../Redux/store';
import {
  RolesChange, SquadsChange, CodexChange, UnitsChange, EquipmentChange, ArmySquadRowAdd,
} from '../Redux/actions/index';
import SquadRow from './SquadRow';
import { handleUnitRowAdd, handleEquipmentRowAdd } from '../utilities/handleRowAdd';
import {
  mockSquad, mockRoles, mockCodex, mockRowAdd, mockUnit, mockEquipment,
} from '../utilities/mockConstants';

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

describe('Testing SquadRow.jsx with proper data loaded in Redux', () => {
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
