import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { mount, findByTestAttr } from '../../utilities/setupTests';
import ViewEquipmentPage from './ViewEquipmentPage';
import { CodexChange, EquipmentChange, UserChange } from '../../Redux/actions/index';
import { mockUser } from '../../utilities/mockConstants';

const setup = () => {
  store.dispatch(UserChange(mockUser));
  return mount(
    <Provider store={store}>
      <Router>
        <ViewEquipmentPage />
      </Router>
    </Provider>,
  );
};

const mockEquipmentArray = [{
  id: '11', Codex: 'Ninjas', Name: 'Dagger', userID: '2222',
}, {
  id: '12', Codex: 'Ninjas', Name: 'Dagger', userID: '4444',
}, {
  id: '22', Codex: 'Pirates', Name: 'musket', userID: '3333',
}];

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

  expect(component.length).toBe(2);
});
