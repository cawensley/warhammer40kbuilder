import store from '../store';
import ArmySquadChange from './ArmySquadChange';

const mockArmySquad = [{ squad: 'ninjas', unit: 'unicorns', equipment: 'horns' }];

test('Redux Action ArmynameChange is successful in redux state change', () => {
  store.dispatch(ArmySquadChange(mockArmySquad));
  const ArmyState = store.getState().army;
  expect(ArmyState.SquadArray[0].squad).toBe('ninjas');
});
