import React from 'react';
import { findByTestAttr, shallow } from '../utilities/setupTests';
import DisplayText from './DisplayText';

const setup = () => shallow(<DisplayText leftText="Squad" rightText="Anrakyr" columns={2} />);

test('renders the Squad format when SQUAD is lefttext', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'displayText');

  expect(component.length).toBe(1);
});
