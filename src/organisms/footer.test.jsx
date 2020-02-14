import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import Footer from './footer';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('Footer renders without error', () => {
  const wrapper = shallow(<Footer />);
  const component = findByTestAttr(wrapper, 'Footer');
  expect(component.length).toBe(1);
});
