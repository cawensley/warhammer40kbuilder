import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../../utilities/testutils';
import firestore from '../../utilities/mockFirestore';
import EditUnitsPage from './EditUnitsPage';

firebase.firestore = firestore;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockSetState = jest.fn();
const mockUnit = {
  Codex: 'Transformers', Name: 'Bee', Cost: 0, Abilities: 'Jump', Gear: ['Axe'],
};

const setup = (isLoading) => {
  jest.clearAllMocks();
  React.useState = jest.fn(() => [{ isLoading, Unit: mockUnit }, mockSetState]);
  return mount(<EditUnitsPage match={{ params: { ID: '4444' } }} />);
};

test('it should render', () => {
  const wrapper = setup(false);
  const component = findByTestAttr(wrapper, 'editUnitsPage');
  expect(component.length).toBe(1);
});
test('Edit Units Page doesnt render when Loading', () => {
  const wrapper = setup(true);
  const component = findByTestAttr(wrapper, 'editUnitsPage');
  expect(component.length).toBe(0);
});
test('Edit Units submit button click calls SET function', () => {
  const wrapper = setup(false);
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
  expect(firestore().collection).toHaveBeenCalledWith('units');
  expect(firestore().collection().doc).toHaveBeenCalledWith('4444');
  expect(firestore().collection().doc().set).toHaveBeenCalledWith({
    Codex: 'Transformers', Name: 'Bee', Cost: 0, Abilities: 'Jump', Gear: ['Axe'],
  });
});
test('Edit Units handleNameInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputBox.simulate('change', { target: { value: 'Megatron' } });
  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Unit: {
      Codex: 'Transformers', Name: 'Megatron', Cost: 0, Abilities: 'Jump', Gear: ['Axe'],
    },
  });
});
test('Edit Units handleCostInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputBox.simulate('change', { target: { value: 70 } });
  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Unit: {
      Codex: 'Transformers', Name: 'Bee', Cost: 70, Abilities: 'Jump', Gear: ['Axe'],
    },
  });
});
test('Edit Units handleAbilitiesInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(2);
  inputBox.simulate('change', { target: { value: 'Dive' } });
  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Unit: {
      Codex: 'Transformers', Name: 'Bee', Cost: 0, Abilities: 'Dive', Gear: ['Axe'],
    },
  });
});
test('Edit Units Rem-Equipment Button works properly', () => {
  const wrapper = setup(false);
  const remButton = findByTestAttr(wrapper, 'remButton');
  remButton.simulate('click', { preventDefault() {} });
  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Unit: {
      Codex: 'Transformers', Name: 'Bee', Cost: 0, Abilities: 'Jump', Gear: [],
    },
  });
});
test('Edit Units Add-Equipment Button works properly', () => {
  const wrapper = setup(false);
  const addButton = findByTestAttr(wrapper, 'addButton');
  addButton.simulate('click', { preventDefault() {} });
  expect(mockSetState).toHaveBeenCalled();
});
