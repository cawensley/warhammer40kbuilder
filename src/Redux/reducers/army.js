export default function army(state = { Name: '', SquadArray: [] }, action) {
  switch (action.type) {
    case 'Army_Name_Change': {
      return { ...state, Name: action.payload };
    }

    case 'Army_Squad_Change': {
      return { ...state, SquadArray: action.payload };
    }

    case 'Army_Squad_Row_Add': {
      const squadRow = {
        Squad: action.payload.firstSquadID,
        UnitQTY: action.payload.firstUnitQTY,
        Unit: action.payload.firstUnitID,
        Equipment: action.payload.firstEquipID,
      };
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads.push(squadRow);
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Squad_Row_Rem': {
      const newSquads = state.SquadArray;
      for (let i = 1; i <= action.payload.popNumber; i += 1) {
        newSquads[action.payload.roleIndex].Squads.pop();
      }
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Squad_Choice_Change': {
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads[action.payload.rowIndex]
        .Squad = action.payload.SquadID;
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Unit_Row_Add': {
      const unitRow = {
        Squad: null,
        UnitQTY: action.payload.firstUnitQTY,
        Unit: action.payload.firstUnitID,
        Equipment: action.payload.firstEquipID,
      };
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads.splice(action.payload.spliceIndex, 0, unitRow);
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Unit_Row_Rem': {
      const newSquads = state.SquadArray;
      for (let i = 0; i < action.payload.spliceNumber; i += 1) {
        newSquads[action.payload.roleIndex].Squads.splice(action.payload.rowIndex, 1);
      }
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Unit_Choice_Change': {
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads[action.payload.rowIndex]
        .Unit = action.payload.UnitID;
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Unit_QTY_Change': {
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads[action.payload.rowIndex]
        .UnitQTY = action.payload.UnitQTY;
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Equipment_Row_Add': {
      const equipmentRow = {
        Squad: null,
        UnitQTY: null,
        Unit: null,
        Equipment: action.payload.firstEquipID,
      };
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads
        .splice(action.payload.rowIndex + 1, 0, equipmentRow);
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Equipment_Row_Rem': {
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads.splice(action.payload.rowIndex, 1);
      return { ...state, SquadArray: newSquads };
    }

    case 'Army_Equipment_Choice_Change': {
      const newSquads = state.SquadArray;
      newSquads[action.payload.roleIndex].Squads[action.payload.rowIndex]
        .Equipment = action.payload.EquipmentID;
      return { ...state, SquadArray: newSquads };
    }

    default: return state;
  }
}
