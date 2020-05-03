import React from 'react';
import firebase from 'firebase/app';
import { mount, findByTestAttr, firestore } from '../../utilities/setupTests';
import NewEquipmentPage from './NewEquipmentPage';
import { mockUser } from '../../utilities/mockConstants';
import store from '../../Redux/store';
import { UserChange } from '../../Redux/actions/index';

firebase.firestore = firestore;

const mocksetNewEquipment = jest.fn();
const mocknewEquipment = { Codex: 'Golems', Name: '', Cost: 0 };

const setup = () => {
  mocksetNewEquipment.mockClear();
  store.dispatch(UserChange(mockUser));
  React.useState = jest.fn(() => [mocknewEquipment, mocksetNewEquipment]);
  return mount(<NewEquipmentPage />);
};

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'newEquipmentPage');

  expect(component.length).toBe(1);
});

test('New Equipment submit button click calls Add function', () => {
  const wrapper = setup();
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(firestore().collection).toHaveBeenCalledWith('equipment');
});

test('New Equipment handleNameInput function works properly', () => {
  const wrapper = setup();
  const inputNameBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputNameBox.simulate('change', { target: { value: 'Benny' } });

  expect(mocksetNewEquipment).toHaveBeenCalledWith({ ...mocknewEquipment, Name: 'Benny' });
});

test('New Equipment handleCostInput function works properly', () => {
  const wrapper = setup();
  const inputCostBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputCostBox.simulate('change', { target: { value: '2' } });

  expect(mocksetNewEquipment).toHaveBeenCalledWith({ ...mocknewEquipment, Cost: 2 });
});
