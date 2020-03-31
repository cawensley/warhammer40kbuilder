import store from '../../store';
import UserChange from './UserChange';
import { mockUser } from '../../../utilities/mockConstants';

test('Redux Action UserChange is successful in redux state change', () => {
  store.dispatch(UserChange(mockUser));
  const UnitsState = store.getState().user;

  expect(UnitsState).toEqual({ uid: '2222', displayName: 'BobbyJoe', Email: 'bobbyJoe@gmail.com' });
});
