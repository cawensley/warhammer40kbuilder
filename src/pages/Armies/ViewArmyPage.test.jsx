import React from 'react';
import { findByTestAttr, shallow } from '../../utilities/setupTests';
import ViewArmyPage from './ViewArmyPage';
import store from '../../Redux/store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import { UserChange, HomeArmiesChange, UserArmiesChange } from '../../Redux/actions/index';
import {
  mockUserArmy1, mockUserArmy2, mockUser, mockWrongUser,
} from '../../utilities/mockConstants';

const setup = () => shallow(<ViewArmyPage match={{ params: { ID: '5555' } }} />);

test('doesnt render without data', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(0);
});

test('renders with good userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy1));
  store.dispatch(UserChange(mockUser));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');

  expect(component.length).toBe(1);
});

test('renders with alternate DIV with almost no userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy2));
  store.dispatch(UserChange(mockUser));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');

  expect(component.length).toBe(1);
});

test('renders without userArmy data but with homeArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange([]));
  store.dispatch(HomeArmiesChange(mockUserArmy1));
  store.dispatch(UserChange(mockWrongUser));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');

  expect(component.length).toBe(1);
});
