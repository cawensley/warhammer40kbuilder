import React from 'react';
import { shallow, findByTestAttr } from '../../utilities/setupTests';
import ViewArmyPage from './ViewArmyPage';
import UserArmiesChange from '../../Redux/actions/UserArmiesChange/UserArmiesChange';
import store from '../../Redux/store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import { mockUserArmy1, mockUserArmy2 } from '../../utilities/mockConstants';

const setup = () => shallow(<ViewArmyPage match={{ params: { ID: '5555' } }} />);

test('doesnt render without data', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');

  expect(component.length).toBe(0);
});

test('renders with good userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy1));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');

  expect(component.length).toBe(1);
});

test('renders with alternate DIV with bad userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy2));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');

  expect(component.length).toBe(1);
});
