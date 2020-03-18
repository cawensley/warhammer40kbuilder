import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import store from '../Redux/store';
import RoleRow from './RoleRow';
import RolesChange from '../Redux/actions/RolesChange';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<RoleRow />);

const mockRoles = [{ id: '11111', Name: 'HQ', SortOrder: 0 }, { id: '22222', Name: 'Elite', SortOrder: 1 }];

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
