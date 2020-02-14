import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import HomePage from './HomePage';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<HomePage />);

test('Home Page renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'HomePage');
  expect(component.length).toBe(1);
});
