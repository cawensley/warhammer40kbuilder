import React from 'react';
import { shallow, findByTestAttr } from '../../utilities/setupTests';
import ViewArmiesPage from './ViewArmiesPage';
import UserArmiesChange from '../../Redux/actions/UserArmiesChange/UserArmiesChange';
import store from '../../Redux/store';
import { mockUserArmy1 } from '../../utilities/mockConstants';

const setup = () => shallow(<ViewArmiesPage />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmiesPage');

  expect(component.length).toBe(1);
});

test('renders userArmies on page', () => {
  store.dispatch(UserArmiesChange(mockUserArmy1));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'armyDisplay');

  expect(component.length).toBe(1);
});
