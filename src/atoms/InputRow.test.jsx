import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr, checkProp } from '../utilities/testutils';
import InputRow from './InputRow';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (onInputChange, type, left, startValue) => shallow(
  <InputRow type={type} left={left} onInputChange={onInputChange} startValue={startValue} />,
);

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'inputRow');
  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { left: 'Hello Out There', type: 'text', startValue: 'jim' };
  checkProp(InputRow, expectedProps);
});

test('Input Component returns value of input box change to Parent', () => {
  const mockonInputChange = jest.fn();
  const wrapper = setup(mockonInputChange);
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'FakeName' } });
  expect(mockonInputChange).toHaveBeenCalledWith('FakeName');
});
