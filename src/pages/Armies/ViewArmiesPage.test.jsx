import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utilities/testutils';
import ViewArmiesPage from './ViewArmiesPage';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<ViewArmiesPage />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmiesPage');
  expect(component.length).toBe(1);
});
