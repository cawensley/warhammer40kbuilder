import { combineReducers } from 'redux';
import isLoggedIn from "./isLoggedIn";
import codex from "./codex";
import codices from "./codices";
import equipment from "./equipment";
import role from "./role";
import roles from "./roles";
import units from "./units";
import squads from "./squads";

export default combineReducers({
    isLoggedIn,
    codex,
    codices,
    equipment,
    role,
    roles,
    squads,
    units
});