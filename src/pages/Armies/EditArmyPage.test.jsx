import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../../utilities/testutils';
import firestore from '../../utilities/mockFirestore';
import EditArmyPage from './EditArmyPage';
import store from '../../Redux/store';
import SquadsChange from '../../Redux/actions/SquadsChange';
import UnitsChange from '../../Redux/actions/UnitsChange';
import UserChange from '../../Redux/actions/UserChange';
import RolesChange from '../../Redux/actions/RolesChange';
import CodexChange from '../../Redux/actions/CodexChange';
import EquipmentChange from '../../Redux/actions/EquipmentChange';

firebase.firestore = firestore;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockSetisLoading = jest.fn();

const setup = (isLoading) => {
  jest.clearAllMocks();
  React.useState = jest.fn(() => [isLoading, mockSetisLoading]);
  return mount(<EditArmyPage match={{ params: { ID: '5555' } }} />);
};

const mockRoles = [{ id: '1111', Name: 'HQ', SortOrder: 0 }];
const mockUser = { uid: '2222' };
const mockUser2 = { uid: '4444' };
const mockCodex = 'zzzzzzz';
const mockSquad = [{
  id: 'TigerSquad', Codex: 'zzzzzzz', Name: 'PirateSquad11', Role: '1111', MinSize: 1, MaxSize: 5, Units: ['TigerLeader'],
}];
const mockUnit = [{ id: 'TigerLeader', Name: 'PirateUnit11', Gear: ['33333', '44444'] }];
const mockEquipment = [{ id: '33333', Name: 'mockSword' }, { id: '44444', Name: 'mockGun' }];

test('EditArmyPage handleNameInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'Megatron' } });
  expect(store.getState().army.Name).toBe('Megatron');
});
beforeEach(() => {
  store.dispatch(UserChange(mockUser));
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(CodexChange(mockCodex));
  store.dispatch(SquadsChange(mockSquad));
  store.dispatch(UnitsChange(mockUnit));
  store.dispatch(EquipmentChange(mockEquipment));
});
test('Army submit function works properly', () => {
  const wrapper = setup(false);
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
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
test('Doest allow edit if the User.uid doesnt match army UserID', () => {
  global.window = Object.create(window);
  const url = '/';
  Object.defineProperty(window, 'location', { value: { hash: url } });
  store.dispatch(UserChange(mockUser2));
  setup(false);
  expect(window.location.hash).toEqual(url);
});
