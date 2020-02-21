import store from '../store';
import UserChange from './UserChange';

const mockUser = { uid: '1111', Name: 'Jimbob', Email: 'Jimbob@gmail.com' };

test('Redux Action UserChange is successful in redux state change', () => {
  store.dispatch(UserChange(mockUser));
  const UnitsState = store.getState().user;
  expect(UnitsState).toEqual({ uid: '1111', Name: 'Jimbob', Email: 'Jimbob@gmail.com' });
});
