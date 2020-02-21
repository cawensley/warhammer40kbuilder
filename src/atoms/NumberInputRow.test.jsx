import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr, checkProp } from '../utilities/testutils';
import NumberInputRow from './NumberInputRow';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (onInputChange, left, startValue) => shallow(
  <NumberInputRow left={left} onInputChange={onInputChange} startValue={startValue} />,
);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'inputRow');
  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { left: 'Hello Out There', startValue: 2 };
  checkProp(NumberInputRow, expectedProps);
});

test('Input Component returns value of input box change to Parent', () => {
  const mockonInputChange = jest.fn();
  const wrapper = setup(mockonInputChange);
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'FakeName' } });
  expect(mockonInputChange).toHaveBeenCalledWith('FakeName');
});
