import React from 'react';
import firebase from 'firebase/app';
import store from '../../Redux/store';
import { mount, findByTestAttr, firestore } from '../../utilities/setupTests';
import EditEquipmentPage from './EditEquipmentPage';
import { mockUser } from '../../utilities/mockConstants';
import { UserChange } from '../../Redux/actions/index';

firebase.firestore = firestore;

const mockSetState = jest.fn();

const setup = (isLoading) => {
  store.dispatch(UserChange(mockUser));
  const mockEquipment = { Codex: 'Pirates', Name: 'PirateSword', Cost: 0 };
  jest.clearAllMocks();
  React.useState = jest.fn(() => [{ isLoading, Equipment: mockEquipment }, mockSetState]);
  return mount(<EditEquipmentPage match={{ params: { ID: '3333' } }} />);
};

test('it should render', () => {
  const wrapper = setup(false);
  const component = findByTestAttr(wrapper, 'editEquipmentPage');

  expect(component.length).toBe(1);
});

test('Edit Equipment Page doesnt render when Loading', () => {
  const wrapper = setup(true);
  const component = findByTestAttr(wrapper, 'editEquipmentPage');

  expect(component.length).toBe(0);
});

test('Edit Equipment submit button click calls SET function', () => {
  const wrapper = setup(false);
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(firestore().collection).toHaveBeenCalledWith('equipment');
});

test('Edit Equipment handleNameInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputBox.simulate('change', { target: { value: 'CoolSword88' } });

  expect(mockSetState).toHaveBeenCalledWith({ isLoading: false, Equipment: { Codex: 'Pirates', Name: 'CoolSword88', Cost: 0 } });
});

test('Edit Equipment handleCostInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputBox.simulate('change', { target: { value: 70 } });

  expect(mockSetState).toHaveBeenCalledWith({ isLoading: false, Equipment: { Codex: 'Pirates', Name: 'PirateSword', Cost: 70 } });
});
