import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr, checkProp } from '../utilities/testutils';
import IDtoName from './IDtoName';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (uniqueID, searchArray) => shallow(
  <IDtoName searchArray={searchArray} uniqueID={uniqueID} />,
);

const defaultArray = [{ id: '12', Name: 'John' }, { id: '1234', Name: 'Bob' }, { id: '123456', Name: 'Janice' }];

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'name-absent');
  expect(component.length).toBe(1);
});

test('renders proper Real Name given props of UniqueID with an Array that contains it', () => {
  const wrapper = setup('1234', defaultArray);
  const component = findByTestAttr(wrapper, 'name-found');
  expect(component.text()).toBe('Bob');
});

test('renders UniqueID when given props of UniqueID with an Array that doesnt have it', () => {
  const wrapper = setup('89asdf', defaultArray);
  const component = findByTestAttr(wrapper, 'name-absent');
  expect(component.text()).toBe('89asdf');
});

test('does not throw warning with expected props', () => {
  const expectedProps = { uniqueID: 'Hello Out There' };
  checkProp(IDtoName, expectedProps);
});
