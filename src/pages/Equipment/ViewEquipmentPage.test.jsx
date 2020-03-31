import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { mount, findByTestAttr } from '../../utilities/setupTests';
import ViewEquipmentPage from './ViewEquipmentPage';
import { CodexChange, EquipmentChange } from '../../Redux/actions/index';

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
