import store from '../Redux/store';
import ArmySquadChange from '../Redux/actions/ArmySquadChange/ArmySquadChange';
import ArmyNameChange from '../Redux/actions/ArmyNameChange/ArmyNameChange';

export default function handleInitialArmy() {
  const initialArray = [];
  store.getState().roles.map((role) => initialArray.push({ Role: role, Squads: [] }));
  store.dispatch(ArmySquadChange(initialArray));
  store.dispatch(ArmyNameChange(''));
}
