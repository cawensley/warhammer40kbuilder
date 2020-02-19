import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../../utilities/testutils';
import firestore from '../../utilities/mockFirestore';
import NewUnitsPage from './NewUnitsPage';

firebase.firestore = firestore;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mocksetNewUnit = jest.fn();
const mocknewUnit = {
  Codex: 'Ninjas', Name: '', Cost: 0, Abilities: 'None', Gear: ['ID10'],
};

const setup = () => {
  mocksetNewUnit.mockClear();
  React.useState = jest.fn(() => [mocknewUnit, mocksetNewUnit]);
  return mount(<NewUnitsPage />);
};

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'newUnitsPage');
  expect(component.length).toBe(1);
});
test('New Units submit button click calls Add function', () => {
  const wrapper = setup();
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
  expect(firestore().collection).toHaveBeenCalledWith('units');
});
test('New Units handleNameInput function works properly', () => {
  const wrapper = setup();
  const inputNameBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputNameBox.simulate('change', { target: { value: 'Benny' } });
  expect(mocksetNewUnit).toHaveBeenCalledWith({ ...mocknewUnit, Name: 'Benny' });
});
test('New Units handleCostInput function works properly', () => {
  const wrapper = setup();
  const inputCostBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputCostBox.simulate('change', { target: { value: '2' } });
  expect(mocksetNewUnit).toHaveBeenCalledWith({ ...mocknewUnit, Cost: 2 });
});
test('New Units handleAbilitiesInput function works properly', () => {
  const wrapper = setup();
  const inputCostBox = findByTestAttr(wrapper, 'input-box').at(2);
  inputCostBox.simulate('change', { target: { value: 'Throwing' } });
  expect(mocksetNewUnit).toHaveBeenCalledWith({ ...mocknewUnit, Abilities: 'Throwing' });
});
test('SelectArray Rem-button calls handleGearRem function', () => {
  const wrapper = setup();
  const remButton = findByTestAttr(wrapper, 'remButton');
  remButton.simulate('click', { preventDefault() {} });
  expect(mocksetNewUnit).toHaveBeenCalledWith({ ...mocknewUnit, Gear: [] });
});
test('SelectArray Add-button calls handleGearAdd function', () => {
  const wrapper = setup();
  const addButton = findByTestAttr(wrapper, 'addButton');
  addButton.simulate('click', { preventDefault() {} });
  expect(mocksetNewUnit).toHaveBeenCalled();
});
