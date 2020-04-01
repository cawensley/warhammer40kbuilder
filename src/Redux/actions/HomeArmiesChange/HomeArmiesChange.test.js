import store from '../../store';
import HomeArmiesChange from './HomeArmiesChange';

const mockHomeArmies = [{ id: '3333', Name: 'CoolArmy99', Date: 'February 90' }];

test('Redux Action HomeArmiesChange is successful in redux state change', () => {
  store.dispatch(HomeArmiesChange(mockHomeArmies));
  const ArmiesState = store.getState().homeArmies;
  expect(ArmiesState).toEqual([{ id: '3333', Name: 'CoolArmy99', Date: 'February 90' }]);
});
