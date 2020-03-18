import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import ArmyEquipmentChoice from '../Redux/actions/ArmyEquipmentChoice';
import findPreviousUnit from '../utilities/findPreviousUnit';
import findRealEquipmentName from '../utilities/findRealEquipmentName';

function EquipmentChoice({ roleIndex, rowIndex }) {
  const choices = findPreviousUnit(roleIndex, rowIndex)[0].Gear;

  // eslint-disable-next-line
  React.useEffect(() => {if (!choices.includes(store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Equipment)) {store.dispatch(ArmyEquipmentChoice({ roleIndex, rowIndex, EquipmentID: choices[0] }));console.log('Set Equipment to 0')}}, [choices]);

  return (
    <select
      data-test="selectInput"
      className="bg-white col-8"
      value={store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Equipment}
      onChange={(event) => store.dispatch(ArmyEquipmentChoice(
        { roleIndex, rowIndex, EquipmentID: event.target.value },
      ))}
    >
      {(choices.length > 0)
        ? choices.map(
          (choice) => <option key={choice} value={choice}>{findRealEquipmentName(choice)}</option>,
        )
        : <option key="0" value="0">No Array Provided</option>}
    </select>
  );
}

EquipmentChoice.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

EquipmentChoice.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};

export default EquipmentChoice;
