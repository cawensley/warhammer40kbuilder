import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import EquipmentChoice from './EquipmentChoice';
import handleInitialArmy from '../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';
import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import UnitsChange from '../Redux/actions/UnitsChange';
import EquipmentChange from '../Redux/actions/EquipmentChange';
import ArmyEquipmentChoice from '../Redux/actions/ArmyEquipmentChoice';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockUnit1 = [{ id: 'TigerLeader', Name: 'PirateSquad11', Gear: [] }];
const mockUnit2 = [{ id: 'TigerLeader', Name: 'PirateSquad11', Gear: ['33333', '44444'] }];
const mockEquipment = [{ id: '33333', Name: 'mockSword' }, { id: '44444', Name: 'mockGun' }];
const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'Tiger',
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: '33333',
};
const mockRoles = [{ id: '111111', Name: 'HQ', SortOrder: 0 }];

const setup = (rowIndex, roleIndex) => shallow(<EquipmentChoice
  roleIndex={roleIndex}
  rowIndex={rowIndex}
/>);

beforeEach(() => {
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(EquipmentChange(mockEquipment));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
});
test('it should render', () => {
  store.dispatch(UnitsChange(mockUnit1));
  const wrapper = setup(0, 0);
  const component = findByTestAttr(wrapper, 'selectInput');
  expect(component.length).toBe(1);
});
test('Equipment options changes state of redux on change', () => {
  store.dispatch(UnitsChange(mockUnit2));
  const wrapper = setup(0, 0);
  const selectInput = findByTestAttr(wrapper, 'selectInput');
  selectInput.simulate('change', { target: { value: 'BiggestAxeEver' } });
  expect(store.getState().army.SquadArray[0].Squads[0].Equipment).toBe('BiggestAxeEver');
});
test('Test UseEffect does not set Equipment Choice to [0]', () => {
  store.dispatch(UnitsChange(mockUnit2));
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup(0, 0);
  expect(store.getState().army.SquadArray[0].Squads[0].Equipment).toBe('33333');
});
test('Test UseEffect sets Equipment Choice to [0]', () => {
  store.dispatch(UnitsChange(mockUnit2));
  store.dispatch(ArmyEquipmentChoice({ roleIndex: 0, rowIndex: 0, EquipmentID: '55555' }));
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup(0, 0);
  expect(store.getState().army.SquadArray[0].Squads[0].Equipment).toBe('33333');
});
