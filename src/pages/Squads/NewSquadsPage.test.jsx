import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../../utilities/testutils';
import firestore from '../../utilities/mockFirestore';
import NewSquadsPage from './NewSquadsPage';

firebase.firestore = firestore;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mocksetNewSquad = jest.fn();
const mocknewSquad = {
  Codex: 'Golems', Name: '', Role: '', MinSize: 0, MaxSize: 0, Units: ['ID20'],
};

const setup = () => {
  mocksetNewSquad.mockClear();
  React.useState = jest.fn(() => [mocknewSquad, mocksetNewSquad]);
  return mount(<NewSquadsPage />);
};

test('New Squads Page renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'newSquadsPage');
  expect(component.length).toBe(1);
});
test('New Squads submit button click calls Add function', () => {
  const wrapper = setup();
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
  expect(firestore().collection).toHaveBeenCalledWith('squads');
});
test('New Squads handleNameInput function works properly', () => {
  const wrapper = setup();
  const inputNameBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputNameBox.simulate('change', { target: { value: 'RockGolem' } });
  expect(mocksetNewSquad).toHaveBeenCalledWith({ ...mocknewSquad, Name: 'RockGolem' });
});
test('New Squads handleMinSize function works properly', () => {
  const wrapper = setup();
  const inputCostBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputCostBox.simulate('change', { target: { value: '5' } });
  expect(mocksetNewSquad).toHaveBeenCalledWith({ ...mocknewSquad, MinSize: 5 });
});
test('New Squads handleMaxSize function works properly', () => {
  const wrapper = setup();
  const inputCostBox = findByTestAttr(wrapper, 'input-box').at(2);
  inputCostBox.simulate('change', { target: { value: '10' } });
  expect(mocksetNewSquad).toHaveBeenCalledWith({ ...mocknewSquad, MaxSize: 10 });
});
test('SelectArray Rem-button calls handleUnitRem function', () => {
  const wrapper = setup();
  const addButton = findByTestAttr(wrapper, 'remButton');
  addButton.simulate('click', { preventDefault() {} });
  expect(mocksetNewSquad).toHaveBeenCalledWith({ ...mocknewSquad, Units: [] });
});
test('SelectArray Add-button calls handleUnitAdd function', () => {
  const wrapper = setup();
  const addButton = findByTestAttr(wrapper, 'addButton');
  addButton.simulate('click', { preventDefault() {} });
  expect(mocksetNewSquad).toHaveBeenCalled();
});
