import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import HomePage from './HomePage';

const setup = () => shallow(<HomePage />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'HomePage');

  expect(component.length).toBe(1);
});
