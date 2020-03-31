import React from 'react';
import firebase from 'firebase/app';
import store from '../../Redux/store';
import { mount, findByTestAttr, firestore } from '../../utilities/setupTests';
import EditSquadsPage from './EditSquadsPage';
import { CodexChange } from '../../Redux/actions';
import { mockCodex } from '../../utilities/mockConstants';

firebase.firestore = firestore;

const mockSetState = jest.fn();
const mockSquad = {
  Codex: 'Autobots', Name: '', Role: 'GoodGuys', MinSize: 0, MaxSize: 0, Units: ['Barricade'],
};

const setup = (isLoading) => {
  jest.clearAllMocks();
  store.dispatch(CodexChange(mockCodex));
  React.useState = jest.fn(() => [{ isLoading, Squad: mockSquad }, mockSetState]);
  return mount(<EditSquadsPage match={{ params: { ID: '5555' } }} />);
};

test('it should render', () => {
  const wrapper = setup(false);
  const component = findByTestAttr(wrapper, 'editSquadsPage');

  expect(component.length).toBe(1);
});

test('Edit Squads Page doesnt render when Loading', () => {
  const wrapper = setup(true);
  const component = findByTestAttr(wrapper, 'editSquadsPage');

  expect(component.length).toBe(0);
});

test('Edit Squads submit button click calls SET function', () => {
  const wrapper = setup(false);
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(firestore().collection).toHaveBeenCalledWith('squads');
});

test('Edit Squads handleNameInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputBox.simulate('change', { target: { value: 'Megatron' } });

  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Squad: {
      Codex: 'Autobots', Name: 'Megatron', Role: 'GoodGuys', MinSize: 0, MaxSize: 0, Units: ['Barricade'],
    },
  });
});

test('Edit Squads handleMinSizeInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputBox.simulate('change', { target: { value: 5 } });

  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Squad: {
      Codex: 'Autobots', Name: '', Role: 'GoodGuys', MinSize: 5, MaxSize: 0, Units: ['Barricade'],
    },
  });
});

test('Edit Squads handleMaxSizeInput function works properly', () => {
  const wrapper = setup(false);
  const inputBox = findByTestAttr(wrapper, 'input-box').at(2);
  inputBox.simulate('change', { target: { value: 10 } });

  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Squad: {
      Codex: 'Autobots', Name: '', Role: 'GoodGuys', MinSize: 0, MaxSize: 10, Units: ['Barricade'],
    },
  });
});

test('Edit Squads Rem-Unit Button works properly', () => {
  const wrapper = setup(false);
  const remButton = findByTestAttr(wrapper, 'remButton');
  remButton.simulate('click', { preventDefault() {} });

  expect(mockSetState).toHaveBeenCalledWith({
    isLoading: false,
    Squad: {
      Codex: 'Autobots', Name: '', Role: 'GoodGuys', MinSize: 0, MaxSize: 0, Units: [],
    },
  });
});

test('Edit Squads Add-Unit Button works properly', () => {
  const wrapper = setup(false);
  const addButton = findByTestAttr(wrapper, 'addButton');
  addButton.simulate('click', { preventDefault() {} });

  expect(mockSetState).toHaveBeenCalled();
});
