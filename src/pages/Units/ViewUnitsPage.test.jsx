import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { mount, findByTestAttr } from '../../utilities/setupTests';
import ViewUnitsPage from './ViewUnitsPage';
import { CodexChange, UnitsChange } from '../../Redux/actions/index';

const setup = () => mount(
  <Provider store={store}>
    <Router>
      <ViewUnitsPage />
    </Router>
  </Provider>,
);

const mockUnitsArray = [{
  id: '11', Codex: 'Ninjas', Name: 'UnitSneaky', Gear: ['sword'],
}, {
  id: '22', Codex: 'Pirates', Name: 'UnitBlack', Gear: ['pistol'],
}];

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewUnitsPage');

  expect(component.length).toBe(1);
});

test('View Units Page renders data when Codex and UnitsArray are in redux', () => {
  store.dispatch(CodexChange('Pirates'));
  store.dispatch(UnitsChange(mockUnitsArray));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'unitsDisplay');

  expect(component.length).toBe(1);
});
