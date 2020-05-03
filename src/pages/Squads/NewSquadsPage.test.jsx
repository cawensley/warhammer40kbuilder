import React from 'react';
import firebase from 'firebase/app';
import { mount, findByTestAttr, firestore } from '../../utilities/setupTests';
import NewSquadsPage from './NewSquadsPage';
import { mockUser } from '../../utilities/mockConstants';
import store from '../../Redux/store';
import { UserChange } from '../../Redux/actions/index';

firebase.firestore = firestore;

const mocksetNewSquad = jest.fn();
const mocknewSquad = {
  Codex: 'Golems', Name: '', Role: '', MinSize: 0, MaxSize: 0, Units: ['ID20'],
};

const setup = () => {
  mocksetNewSquad.mockClear();
  store.dispatch(UserChange(mockUser));
  React.useState = jest.fn(() => [mocknewSquad, mocksetNewSquad]);
  return mount(<NewSquadsPage />);
};

test('it should render', () => {
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
