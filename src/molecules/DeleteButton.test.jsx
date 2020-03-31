import React from 'react';
import firebase from 'firebase/app';
import {
  shallow, findByTestAttr, checkProp, firestore,
} from '../utilities/setupTests';
import DeleteButton from './DeleteButton';

firebase.firestore = firestore;

const setup = (uniqueID, collectionName) => shallow(
  <DeleteButton uniqueID={uniqueID} collectionName={collectionName} />,
);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'deleteButton');

  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { uniqueID: 'IamHuman', collectionName: 'coolGear' };

  checkProp(DeleteButton, expectedProps);
});

test('Delete button click calls RemoveItem function', () => {
  const wrapper = setup('JiminyCrickett', 'books');
  const deleteButton = findByTestAttr(wrapper, 'deleteButton');
  deleteButton.simulate('click', { preventDefault() {} });

  expect(firestore().collection).toHaveBeenCalledWith('books');
});
