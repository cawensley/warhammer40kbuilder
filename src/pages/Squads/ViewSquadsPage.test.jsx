import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { mount, findByTestAttr } from '../../utilities/setupTests';
import ViewSquadsPage from './ViewSquadsPage';
import { CodexChange, SquadsChange } from '../../Redux/actions/index';

const setup = () => mount(
  <Provider store={store}>
    <Router>
      <ViewSquadsPage />
    </Router>
  </Provider>,
);

const mockSquadsArray = [
  {
    id: '11', Codex: 'Ninjas', Role: 'troops', Name: 'SquadSneaky', Units: ['sneakyGuys'],
  },
  {
    id: '22', Codex: 'Pirates', Role: 'elites', Name: 'SquadSwash', Units: ['burglers'],
  },
];

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewSquadsPage');

  expect(component.length).toBe(1);
});

test('View Squads Page renders data when Codex and SquadsArray are in redux', () => {
  store.dispatch(CodexChange('Ninjas'));
  store.dispatch(SquadsChange(mockSquadsArray));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'squadsDisplay');

  expect(component.length).toBe(1);
});
