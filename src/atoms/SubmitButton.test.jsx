import React from 'react';
import { findByTestAttr, shallow, checkProp } from '../utilities/setupTests';
import SubmitButton from './SubmitButton';

const setup = (buttontext) => shallow(<SubmitButton buttontext={buttontext} />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-button');

  expect(component.length).toBe(1);
});

test('renders button with proper text when given props', () => {
  const wrapper = setup('IamHuman');
  const component = findByTestAttr(wrapper, 'component-button');

  expect(component.text()).toBe('IamHuman');
});

test('does not throw warning with expected props', () => {
  const expectedProps = { buttontext: 'IamHuman' };

  checkProp(SubmitButton, expectedProps);
});
