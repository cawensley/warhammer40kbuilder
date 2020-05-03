import React from 'react';
import { findByTestAttr, shallow, checkProp } from '../utilities/setupTests';
import TextInputRow from './TextInputRow';

const setup = (onInputChange, type, left, startValue) => shallow(
  <TextInputRow type={type} left={left} onInputChange={onInputChange} startValue={startValue} />,
);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'inputRow');

  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { left: 'Hello Out There', type: 'text', startValue: 'jim' };

  checkProp(TextInputRow, expectedProps);
});

test('Input Component returns value of input box change to Parent', () => {
  const mockonInputChange = jest.fn();
  const wrapper = setup(mockonInputChange);
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'FakeName' } });

  expect(mockonInputChange).toHaveBeenCalledWith('FakeName');
});
