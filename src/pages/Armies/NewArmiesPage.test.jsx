import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utilities/testutils';
import NewArmiesPage from './NewArmiesPage';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => mount(<NewArmiesPage />);

test('New Armies Page renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'NewArmiesPage');
  expect(component.length).toBe(1);
});
