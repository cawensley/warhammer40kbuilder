import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import Footer from './footer';

test('it should render', () => {
  const wrapper = shallow(<Footer />);
  const component = findByTestAttr(wrapper, 'Footer');

  expect(component.length).toBe(1);
});
