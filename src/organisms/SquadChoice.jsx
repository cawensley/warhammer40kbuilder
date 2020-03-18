import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import codexFilter from '../utilities/codexFilter';
import ArmySquadChoice from '../Redux/actions/ArmySquadChoice';

function SquadChoice({ roleIndex, rowIndex }) {
  const displayID = store.getState().army.SquadArray[roleIndex].Role.id;
  const choices = codexFilter(store.getState().squads).filter((squad) => squad.Role === displayID);

  return (
    <select
      data-test="selectInput"
      className="bg-white col-2"
      value={store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Squad}
      onChange={(event) => store.dispatch(ArmySquadChoice(
        { roleIndex, rowIndex, SquadID: event.target.value },
      ))}
    >
      {(choices.length > 0)
        ? choices.map(
          (choice) => <option key={choice.id} value={choice.id}>{choice.Name}</option>,
        )
        : <option key="0" value="0">No Array Provided</option>}
    </select>
  );
}

SquadChoice.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

SquadChoice.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};
export default SquadChoice;
