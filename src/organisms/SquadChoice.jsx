import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import codexFilter from '../utilities/codexFilter';
import ArmySquadChoice from '../Redux/actions/ArmySquadChoice/ArmySquadChoice';

const SquadChoice = ({ roleIndex, rowIndex }) => {
  const displayID = store.getState().army.SquadArray[roleIndex].Role.id;
  const choices = codexFilter(store.getState().squads).filter((squad) => squad.Role === displayID);
  const currentChoice = store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Squad;

  if (!currentChoice) {
    return <div className="col-3" />;
  }

  return (
    <div className="col-md-3 pt-4 pt-md-0">
      <div className="row p-selector-minheight">
        <div className="d-md-none text-warning col-2 p-1 text-left">
          Squad
          :&nbsp;
        </div>
        <select
          data-test="selectInput"
          className="bg-white col-6 col-md-12"
          value={currentChoice}
          onChange={(event) => store.dispatch(ArmySquadChoice(
            { roleIndex, rowIndex, SquadID: event.target.value },
          ))}
        >
          {choices.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.Name}
&nbsp;(
              {choice.MinSize}
              -
              {choice.MaxSize}
              )
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

SquadChoice.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

SquadChoice.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};
export default SquadChoice;
