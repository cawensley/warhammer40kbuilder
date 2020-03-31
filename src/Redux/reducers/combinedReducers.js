import { combineReducers } from 'redux';
import codex from './codex';
import codices from './codices';
import equipment from './equipment';
import role from './role';
import roles from './roles';
import units from './units';
import squads from './squads';
import user from './user';
import army from './army';
import armyPoints from './armyPoints';
import userArmies from './userArmies';

export default combineReducers({
  codex,
  codices,
  equipment,
  role,
  roles,
  squads,
  units,
  user,
  army,
  armyPoints,
  userArmies,
});
