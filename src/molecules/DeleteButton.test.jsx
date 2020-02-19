import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr, checkProp } from '../utilities/testutils';
import DeleteButton from './DeleteButton';
import firestore from '../utilities/mockFirestore';

firebase.firestore = firestore;
Enzyme.configure({ adapter: new EnzymeAdapter() });

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
  expect(firestore().collection().doc).toHaveBeenCalledWith('JiminyCrickett');
});
