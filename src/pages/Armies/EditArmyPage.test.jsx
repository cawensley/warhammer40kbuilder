import React from 'react';
import firebase from 'firebase/app';
import { mount, findByTestAttr, firestore } from '../../utilities/setupTests';
import EditArmyPage from './EditArmyPage';
import store from '../../Redux/store';
import {
  SquadsChange, UnitsChange, UserChange, RolesChange, CodexChange, EquipmentChange,
} from '../../Redux/actions/index';
import {
  mockUnit, mockUser, mockRoles, mockCodex, mockSquad, mockEquipment,
} from '../../utilities/mockConstants';

firebase.firestore = firestore;

const mockSetisLoading = jest.fn();

const setup = (isLoading) => {
  jest.clearAllMocks();
  React.useState = jest.fn(() => [isLoading, mockSetisLoading]);
  return mount(<EditArmyPage match={{ params: { ID: '5555' } }} />);
};

describe('testing EditArmyPage.jsx with proper redux data loaded', () => {
  beforeEach(() => {
    store.dispatch(UserChange(mockUser));
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(CodexChange(mockCodex));
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(UnitsChange(mockUnit));
    store.dispatch(EquipmentChange(mockEquipment));
  });

  test('EditArmyPage handleNameInput function works properly', () => {
    const wrapper = setup(false);
    const inputBox = findByTestAttr(wrapper, 'input-box');
    inputBox.simulate('change', { target: { value: 'Megatron' } });

    expect(store.getState().army.Name).toBe('Megatron');
  });

  test('Army submit function works properly', () => {
    const wrapper = setup(false);
    const submitButton = findByTestAttr(wrapper, 'submitButton');
    submitButton.simulate('submit', {
      preventDefault() {
      },
    });

    expect(firestore().collection).toHaveBeenCalledWith('armies');
  });

  test('it should render with isLoading set to false', () => {
    const wrapper = setup(false);
    const component = findByTestAttr(wrapper, 'EditArmyPage');

    expect(component.length).toBe(1);
  });

  test('it shouldnt render with isLoading set to true', () => {
    const wrapper = setup(true);
    const component = findByTestAttr(wrapper, 'EditArmyPage');

    expect(component.length).toBe(0);
  });
});
