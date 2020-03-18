import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import ArmyUnitChoice from '../Redux/actions/ArmyUnitChoice';
import findPreviousSquad from '../utilities/findPreviousSquad';
import findRealUnitName from '../utilities/findRealUnitName';

function UnitChoice({ roleIndex, rowIndex }) {
  const choices = findPreviousSquad(roleIndex, rowIndex)[0].Units;

  // eslint-disable-next-line
  React.useEffect(() => {if (!choices.includes(store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Unit)) {store.dispatch(ArmyUnitChoice({ roleIndex, rowIndex, UnitID: choices[0] }));console.log('Set Unit to 0');}}, [choices]);

  return (
    <select
      data-test="selectInput"
      className="bg-white col-6"
      value={store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Unit}
      onChange={(event) => store.dispatch(ArmyUnitChoice(
        { roleIndex, rowIndex, UnitID: event.target.value },
      ))}
    >
      {(choices.length > 0)
        ? choices.map(
          (choice) => (<option key={choice} value={choice}>{findRealUnitName(choice)}</option>),
        )
        : <option key="0" value="0">No Array Provided</option>}
    </select>
  );
}

UnitChoice.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

UnitChoice.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};

export default UnitChoice;
