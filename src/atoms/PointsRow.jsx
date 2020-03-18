import React from 'react';
import store from '../Redux/store';
import ArmyPointsChange from '../Redux/actions/ArmyPointsChange';

function PointsRow() {
  function calculateArmyPoints() {
    let totalPoints = 0;
    let unitQTY = 1;
    store.getState().army.SquadArray.forEach((squadRow) => {
      squadRow.Squads.forEach((squad) => {
        if (squad.Unit) {
          unitQTY = squad.UnitQTY;
          const unitCost = store.getState().units
            .filter((data) => data.id.includes(squad.Unit))[0].Cost;
          const gearCost = store.getState().equipment
            .filter((data) => data.id.includes(squad.Equipment))[0].Cost;
          totalPoints += unitQTY * (unitCost + gearCost);
        } else {
          const gearCost = store.getState().equipment
            .filter((data) => data.id.includes(squad.Equipment))[0].Cost;
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
}

export default PointsRow;
