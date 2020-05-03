import store from '../../store';
import handleInitialArmy from '../../../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../ArmySquadRowAdd/ArmySquadRowAdd';
import RolesChange from '../RolesChange/RolesChange';
import ArmySquadChoice from './ArmySquadChoice';
import { mockRowAdd, mockRole } from '../../../utilities/mockConstants';

const mockPayload = { roleIndex: 0, rowIndex: 0, SquadID: 'PirateSquad' };

test('Redux Action ArmySquadChoice is successful in redux state change', () => {
  store.dispatch(RolesChange(mockRole));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
  store.dispatch(ArmySquadChoice(mockPayload));
  const ArmyState = store.getState().army.SquadArray;

  expect(ArmyState[0].Squads[0].Squad).toBe('PirateSquad');
});
