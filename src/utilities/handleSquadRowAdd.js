import store from '../Redux/store';
import codexFilter from './codexFilter';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';

export default function handleSquadRowAdd(roleIndex) {
  const roleID = store.getState().roles[roleIndex].id;
  const firstSquad = (codexFilter(store.getState().squads))
    .filter((squad) => squad.Role === roleID);
  if (firstSquad.length > 0) {
    const firstSquadID = firstSquad[0].id;
    const firstUnitQTY = firstSquad[0].MinSize;
    const firstUnitID = firstSquad[0].Units[0];
    const firstEquipID = store.getState().units
      .filter((data) => data.id.includes(firstUnitID))[0].Gear[0];
    store.dispatch(ArmySquadRowAdd({
      roleIndex, firstSquadID, firstUnitQTY, firstUnitID, firstEquipID,
    }));
  }
}
