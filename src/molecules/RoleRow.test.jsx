import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import store from '../Redux/store';
import RoleRow from './RoleRow';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<RoleRow />);

test('RoleRow component renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'RoleRow');
  expect(component.length).toBe(1);
});

test('RoleRow state updates with value of input box upon change', () => {
  const wrapper = setup();
  const inputBox = findByTestAttr(wrapper, 'RoleRowSelect');
  inputBox.simulate('change', { target: { value: 'caboose' } });
  expect(store.getState().role).toBe('caboose');
});
