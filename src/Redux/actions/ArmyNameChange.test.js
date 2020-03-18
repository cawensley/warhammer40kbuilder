import store from '../store';
import ArmyNameChange from './ArmyNameChange';

test('Redux Action ArmynameChange is successful in redux state change', () => {
  store.dispatch(ArmyNameChange('BestArmyEverByAMile'));
  const ArmyState = store.getState().army;
  expect(ArmyState.Name).toBe('BestArmyEverByAMile');
});
