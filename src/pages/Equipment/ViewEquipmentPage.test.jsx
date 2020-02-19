import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { findByTestAttr } from '../../utilities/testutils';
import ViewEquipmentPage from './ViewEquipmentPage';
import CodexChange from '../../Redux/actions/CodexChange';
import EquipmentChange from '../../Redux/actions/EquipmentChange';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => mount(
  <Provider store={store}>
    <Router>
      <ViewEquipmentPage />
    </Router>
  </Provider>,
);

const mockEquipmentArray = [{ id: '11', Codex: 'Ninjas', Name: 'Dagger' }, { id: '22', Codex: 'Pirates', Name: 'musket' }];

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewEquipmentPage');
  expect(component.length).toBe(1);
});
test('View Equipment Page renders data when Codex and EquipmentArrays are in redux', () => {
  store.dispatch(CodexChange('Ninjas'));
  store.dispatch(EquipmentChange(mockEquipmentArray));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'equipDisplay');
  expect(component.length).toBe(1);
});
