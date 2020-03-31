import React from 'react';
import store from '../Redux/store';
import ArmyPointsChange from '../Redux/actions/ArmyPointsChange/ArmyPointsChange';

const PointsRow = () => {
  function GetUnitCost(unitID) {
    if (store.getState().units
      .filter((data) => data.id.includes(unitID)).length > 0) {
      return store.getState().units
        .filter((data) => data.id.includes(unitID))[0].Cost;
    } return 0;
  }

  function GetGearCost(equipmentID) {
    if (store.getState().equipment
      .filter((data) => data.id.includes(equipmentID)).length > 0) {
      return store.getState().equipment
        .filter((data) => data.id.includes(equipmentID))[0].Cost;
    } return 0;
  }

  function calculateArmyPoints() {
    let totalPoints = 0;
    let unitQTY = 1;
    store.getState().army.SquadArray.forEach((squadRow) => {
      squadRow.Squads.forEach((squad) => {
        const gearCost = GetGearCost(squad.Equipment);
        if (squad.Unit) {
          unitQTY = squad.UnitQTY;
          const unitCost = GetUnitCost(squad.Unit);
          totalPoints += unitQTY * (unitCost + gearCost);
        } else {
          totalPoints += unitQTY * gearCost;
        }
      });
    });
    store.dispatch(ArmyPointsChange(totalPoints));
  }

  // eslint-disable-next-line
  React.useEffect(() => { calculateArmyPoints(); }, [store.getState().army]);

  return (
    <div data-test="pointsRow" className="row mt-4">
      <div className="text-warning col-6 text-right">Points:</div>
      <div className="text-white col-6 text-left">
        {store.getState().armyPoints}
                &nbsp;Points
      </div>
    </div>
  );
};

export default PointsRow;
