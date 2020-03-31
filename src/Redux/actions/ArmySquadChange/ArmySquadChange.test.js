import store from '../../store';
import ArmySquadChange from './ArmySquadChange';
import { mockSquad } from '../../../utilities/mockConstants';

test('Redux Action ArmynameChange is successful in redux state change', () => {
  store.dispatch(ArmySquadChange(mockSquad));
  const ArmyState = store.getState().army;

  expect(ArmyState.SquadArray[0].id).toBe('TigerSquad');
});
