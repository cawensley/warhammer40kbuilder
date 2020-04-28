import React from 'react';
import firebase from 'firebase/app';
import {
  mount, findByTestAttr, checkProp, firestore,
} from '../utilities/setupTests';
import DeleteButton from './DeleteButton';

firebase.firestore = firestore;
const mockSetShow = jest.fn();

const setup = (uniqueID, collectionName, mockShow) => {
  mockSetShow.mockClear();
  React.useState = jest.fn(() => [mockShow, mockSetShow]);
  return mount(
    <DeleteButton uniqueID={uniqueID} collectionName={collectionName} />,
  );
};

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'deleteButton');

  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { uniqueID: 'IamHuman', collectionName: 'coolGear', uniqueName: 'Anrakyr' };

  checkProp(DeleteButton, expectedProps);
});

test('Delete button click changes DeleteModal to SHOW', () => {
  const wrapper = setup('JiminyCrickett', 'books', false);
  const deleteButton = findByTestAttr(wrapper, 'deleteButton');
  deleteButton.simulate('click', { preventDefault() {} });

  expect(mockSetShow).toHaveBeenCalledWith(true);
});

test('Delete button click calls REMOVE ITEM function', () => {
  const wrapper = setup('JiminyCrickett', 'books', true);
  const deleteButton = findByTestAttr(wrapper, 'deleteButton').at(1);
  deleteButton.simulate('click', { preventDefault() {} });

  expect(mockSetShow).toHaveBeenCalledWith(false);
  expect(firestore().collection).toHaveBeenCalledWith('books');
});

test('Cancel button click calls CLOSE MODAL function', () => {
  const wrapper = setup('JiminyCrickett', 'books', true);
  const cancelButton = findByTestAttr(wrapper, 'cancelButton');
  cancelButton.simulate('click', { preventDefault() {} });

  expect(mockSetShow).toHaveBeenCalledWith(false);
});
