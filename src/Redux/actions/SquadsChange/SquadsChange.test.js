import store from '../../store';
import SquadsChange from './SquadsChange';

test('Redux Action SquadsChange is successful in redux state change', () => {
  store.dispatch(SquadsChange(['Ninjas', 'Pirates']));
  const SquadsState = store.getState().squads;

  expect(SquadsState).toEqual(['Ninjas', 'Pirates']);
});
