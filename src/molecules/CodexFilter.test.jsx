import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import CodexFilter from './CodexFilter';
import store from '../Redux/store';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<CodexFilter />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'codexFilter');
  expect(component.length).toBe(1);
});

test('Codex filter state updates with value of input box upon change', () => {
  const wrapper = setup();
  const inputBox = findByTestAttr(wrapper, 'inputbox');
  inputBox.simulate('change', { target: { value: 'train' } });
  expect(store.getState().codex).toBe('train');
});
