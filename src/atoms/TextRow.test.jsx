import React from 'react';
import { findByTestAttr, shallow, checkProp } from '../utilities/setupTests';
import TextRow from './TextRow';

const setup = (left, right) => shallow(<TextRow left={left} right={right} />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'textRow');

  expect(component.length).toBe(1);
});

test('renders TextRow with proper text when given props', () => {
  const wrapper = setup('LeftHanded', 'RightHanded');
  const component = findByTestAttr(wrapper, 'textRow');

  expect(component.text()).toBe('LeftHandedRightHanded');
});

test('does not throw warning with expected props', () => {
  const expectedProps = { left: 'LeftHanded' };

  checkProp(TextRow, expectedProps);
});
