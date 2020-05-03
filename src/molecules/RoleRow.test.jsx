import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import store from '../Redux/store';
import RoleRow from './RoleRow';
import RolesChange from '../Redux/actions/RolesChange/RolesChange';
import { mockRoles } from '../utilities/mockConstants';

const setup = () => shallow(<RoleRow />);

test('it should render', () => {
  store.dispatch(RolesChange(mockRoles));
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
