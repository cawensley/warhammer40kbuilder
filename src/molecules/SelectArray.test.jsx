import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import SelectArray from './SelectArray';

const mockSetThingSelected = jest.fn();
const mockCodexArray = [{ id: '11', Name: 'PirateSquad11' }, { id: '12', Name: 'PirateSquad12' }, { id: '13', Name: 'PirateSquad13' }];
const mockArrayDisplay = ['PirateSquad21', 'PirateSquad22', 'PirateSquad23'];

const setup = (codexArray, arrayDisplay, onItemAdd, onItemRem, left) => {
  mockSetThingSelected.mockClear();
  React.useState = jest.fn(() => ['', mockSetThingSelected]);
  return shallow(<SelectArray
    codexArray={codexArray}
    arrayDisplay={arrayDisplay}
    onItemAdd={onItemAdd}
    onItemRemove={onItemRem}
    left={left}
  />);
};

test('it should render', () => {
  const wrapper = setup(mockCodexArray, []);
  const component = findByTestAttr(wrapper, 'SelectArray');

  expect(component.length).toBe(1);
});

test('SelectArray Add-button calls function provided by Parent', () => {
  const mockonItemAdd = jest.fn();
  const wrapper = setup(mockCodexArray, [], mockonItemAdd);
  const addButton = findByTestAttr(wrapper, 'addButton');
  addButton.simulate('click', { preventDefault() {} });

  expect(mockonItemAdd).toHaveBeenCalled();
});

test('SelectArray Remove-button calls function provided by Parent', () => {
  const mockonItemRem = jest.fn();
  const wrapper = setup(mockCodexArray, mockArrayDisplay, jest.fn(), mockonItemRem);
  const remButton = findByTestAttr(wrapper, 'remButton').at(1);
  remButton.simulate('click', { preventDefault() {} });

  expect(mockonItemRem).toHaveBeenCalled();
});

test('SelectArray options changes state of itemSelected', () => {
  const wrapper = setup(mockCodexArray, mockArrayDisplay);
  const selectInput = findByTestAttr(wrapper, 'selectInput');
  selectInput.simulate('change', { target: { value: 'train' } });

  expect(mockSetThingSelected).toBeCalledWith('train');
});

test('Test UseEffect works with a CodexArray provided', () => {
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup(mockCodexArray, []);

  expect(mockSetThingSelected).toBeCalledWith('11');
});

test('Test UseEffect doesnt run when empty CodexArray provided', () => {
  React.useEffect = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  setup([], []);

  expect(mockSetThingSelected).not.toHaveBeenCalled();
});
