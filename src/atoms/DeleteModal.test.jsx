import React from 'react';
import firebase from 'firebase/app';
import { shallow, findByTestAttr, firestore } from '../utilities/setupTests';
import DeleteModal from './DeleteModal';

firebase.firestore = firestore;
const mockOnConfirm = jest.fn();
const mockOnCancel = jest.fn();

const setup = (mockShow) => {
  mockOnConfirm.mockClear();
  mockOnCancel.mockClear();
  return shallow(
    <DeleteModal show={mockShow} name="Szeras" onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
  );
};

test('it shouldnt render', () => {
  const wrapper = setup(false);
  const component = findByTestAttr(wrapper, 'deleteModal');

  expect(component.length).toBe(0);
});

test('it should render', () => {
  const wrapper = setup(true);
  const component = findByTestAttr(wrapper, 'deleteModal');

  expect(component.length).toBe(1);
});

test('Delete button click calls DELETE confirm function', () => {
  const wrapper = setup(true);
  const deleteButton = findByTestAttr(wrapper, 'deleteButton');
  deleteButton.simulate('click', { preventDefault() {} });

  expect(mockOnConfirm).toHaveBeenCalled();
});

test('Cancel button click calls DELETE Cancel function', () => {
  const wrapper = setup(true);
  const cancelButton = findByTestAttr(wrapper, 'cancelButton');
  cancelButton.simulate('click', { preventDefault() {} });

  expect(mockOnCancel).toHaveBeenCalled();
});
