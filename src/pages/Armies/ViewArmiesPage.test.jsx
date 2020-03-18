import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utilities/testutils';
import ViewArmiesPage from './ViewArmiesPage';
import UserArmiesChange from '../../Redux/actions/UserArmiesChange';
import store from '../../Redux/store';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<ViewArmiesPage />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmiesPage');
  expect(component.length).toBe(1);
});

test('renders userArmies on page', () => {
  const mockUserArmy1 = [{
    id: 'xxxxx', Name: 'coolArmy11', Date: { Day: 2, Month: 2, Year: 2222 }, Points: 999, SquadArray: [],
  }];
  store.dispatch(UserArmiesChange(mockUserArmy1));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'armyDisplay');
  expect(component.length).toBe(1);
});
