import store from '../../store';
import UserArmiesChange from './UserArmiesChange';

const mockUserArmies = [{ id: '3333', Name: 'CoolArmy99', Date: 'February 90' }];

test('Redux Action UserArmiesChange is successful in redux state change', () => {
  store.dispatch(UserArmiesChange(mockUserArmies));
  const ArmiesState = store.getState().userArmies;

  expect(ArmiesState).toEqual([{ id: '3333', Name: 'CoolArmy99', Date: 'February 90' }]);
});
