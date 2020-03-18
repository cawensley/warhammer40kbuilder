import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../../utilities/testutils';
import NewArmyPage from './NewArmyPage';
import store from '../../Redux/store';
import RolesChange from '../../Redux/actions/RolesChange';
import firestore from '../../utilities/mockFirestore';
import UserChange from '../../Redux/actions/UserChange';
import CodexChange from '../../Redux/actions/CodexChange';
import ArmySquadRowAdd from '../../Redux/actions/ArmySquadRowAdd';
import SquadsChange from '../../Redux/actions/SquadsChange';
import UnitsChange from '../../Redux/actions/UnitsChange';
import EquipmentChange from '../../Redux/actions/EquipmentChange';
import handleEquipmentRowAdd from '../../utilities/handleEquipmentRowAdd';

firebase.firestore = firestore;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => mount(<NewArmyPage />);

const mockRoles = [{ id: '111111', Name: 'HQ', SortOrder: 0 }];
const mockUser = { uid: '2222' };
const mockCodex = 'zzzzzzz';
const mockSquad = [{
  id: 'TigerSquad', Codex: 'zzzzzzz', Name: 'PirateSquad11', Role: '111111', MinSize: 1, MaxSize: 5, Units: ['TigerLeader'],
}];
const mockUnit = [{
  id: 'TigerLeader', Cost: 10, Name: 'PirateSquad11', Gear: ['33333', '44444'],
}];
const mockEquipment = [{ id: '33333', Cost: 5, Name: 'mockSword' }, { id: '44444', Cost: 6, Name: 'mockGun' }];
const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'TigerSquad',
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: '33333',
};

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
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(CodexChange(mockCodex));
  store.dispatch(SquadsChange(mockSquad));
  store.dispatch(UnitsChange(mockUnit));
  store.dispatch(EquipmentChange(mockEquipment));
  const wrapper = setup();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  handleEquipmentRowAdd(0, 0);
  wrapper.setProps({});
  const component = findByTestAttr(wrapper, 'NewArmyPage');
  expect(component.length).toBe(1);
});
