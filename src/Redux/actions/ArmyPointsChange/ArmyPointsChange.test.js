import store from '../../store';
import ArmyPointsChange from './ArmyPointsChange';

test('Redux Action ArmyPointsChange is successful in redux state change', () => {
  store.dispatch(ArmyPointsChange(1500));
  const totalPoints = store.getState().armyPoints;

  expect(totalPoints).toBe(1500);
});
