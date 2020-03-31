import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import ArmyEquipmentChoice from '../Redux/actions/ArmyEquipmentChoice/ArmyEquipmentChoice';
import { findPreviousUnit } from '../utilities/findPrevious';
import { findRealEquipmentName } from '../utilities/findName';
import { handleEquipmentRowAdd } from '../utilities/handleRowAdd';
import GreyButton from '../atoms/GreyButton';
import { handleEquipmentRowRemove } from '../utilities/handleRowRemove';

const EquipmentChoice = ({ roleIndex, rowIndex }) => {
  const choices = findPreviousUnit(roleIndex, rowIndex).Gear;
  const currentChoice = store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Equipment;

  React.useEffect(() => {
    if (choices.length === 0 && currentChoice) {
      store.dispatch(ArmyEquipmentChoice({ roleIndex, rowIndex, EquipmentID: undefined }));
    } else if (!choices.includes(currentChoice) && choices.length > 0) {
      store.dispatch(ArmyEquipmentChoice({ roleIndex, rowIndex, EquipmentID: choices[0] }));
    }
  },
  [choices, rowIndex, roleIndex, currentChoice]);

  if (choices.length === 0) {
    return <div className="col-5" />;
  }

  return (
    <div className="col-5">
      <div className="row">
        <select
          data-test="selectInput"
          className="bg-white col-8"
          value={currentChoice}
          onChange={(event) => store.dispatch(ArmyEquipmentChoice(
            { roleIndex, rowIndex, EquipmentID: event.target.value },
          ))}
        >
          {choices.map((choice) => (
            <option key={choice} value={choice}>{findRealEquipmentName(choice)}</option>
          ))}
        </select>
        <button data-test="EquipRowAdd" className="col-2 bg-success border-primary" aria-label="AddGear" type="button" onClick={() => handleEquipmentRowAdd(roleIndex, rowIndex)}><i className="fas fa-plus" /></button>
        {(store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Unit)
          ? <GreyButton />
          : <button data-test="EquipRowRem" className="col-2 bg-danger border-primary" aria-label="RemGear" type="button" onClick={() => handleEquipmentRowRemove(roleIndex, rowIndex)}><i className="fas fa-minus" /></button>}
      </div>
    </div>
  );
};

EquipmentChoice.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

EquipmentChoice.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};

export default EquipmentChoice;
