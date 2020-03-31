import React from 'react';
import { findByTestAttr, shallow } from '../utilities/setupTests';
import GreyButton from './GreyButton';

const setup = () => shallow(<GreyButton />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'greyButton');

  expect(component.length).toBe(1);
});
