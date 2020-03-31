import React from 'react';
import firebase from 'firebase/app';
import { mount, findByTestAttr, firestore } from '../../utilities/setupTests';
import NewArmyPage from './NewArmyPage';
import store from '../../Redux/store';
import {
  RolesChange, UserChange, CodexChange, ArmySquadRowAdd,
  SquadsChange, UnitsChange, EquipmentChange,
} from '../../Redux/actions/index';
import { handleEquipmentRowAdd } from '../../utilities/handleRowAdd';
import {
  mockUser, mockRoles, mockCodex, mockSquad, mockUnit, mockEquipment, mockRowAdd,
} from '../../utilities/mockConstants';

firebase.firestore = firestore;
const setup = () => mount(<NewArmyPage />);

test('NewArmyPage handleNameInput function works properly', () => {
  const wrapper = setup();
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'Megatron' } });

  expect(store.getState().army.Name).toBe('Megatron');
});

test('Army submit function works properly', () => {
  store.dispatch(UserChange(mockUser));
  const wrapper = setup();
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(firestore().collection).toHaveBeenCalledWith('armies');
});

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'NewArmyPage');

  expect(component.length).toBe(1);
});

describe('test full render functionality', () => {
  beforeEach(() => {
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(CodexChange(mockCodex));
    store.dispatch(SquadsChange(mockSquad));
    store.dispatch(UnitsChange(mockUnit));
    store.dispatch(EquipmentChange(mockEquipment));
  });
  test('it should render successful redux data', () => {
    const wrapper = setup();
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
    handleEquipmentRowAdd(0, 0);
    wrapper.setProps({});
    const component = findByTestAttr(wrapper, 'NewArmyPage');

    expect(component.length).toBe(1);
  });
  test('it should render 0 points cost', () => {
    const wrapper = setup();
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
    store.dispatch(EquipmentChange([]));
    wrapper.setProps({});
    const component = findByTestAttr(wrapper, 'NewArmyPage');

    expect(component.length).toBe(1);
  });
});
