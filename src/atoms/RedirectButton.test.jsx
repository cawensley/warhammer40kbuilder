import React from 'react';
import { findByTestAttr, shallow, checkProp } from '../utilities/setupTests';
import RedirectButton from './RedirectButton';

const setup = (buttontext, redirect) => shallow(
  <RedirectButton redirect={redirect} buttontext={buttontext} />,
);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-button');

  expect(component.length).toBe(1);
});

test('renders button with proper text when given props', () => {
  const wrapper = setup('HelloPuppy', '/vitalpage/new');
  const component = findByTestAttr(wrapper, 'component-button');

  expect(component.text()).toBe('HelloPuppy');
});

test('does not throw warning with expected props', () => {
  const expectedProps = { buttontext: 'HelloPuppy', redirect: '/vitalpage/new' };

  checkProp(RedirectButton, expectedProps);
});
