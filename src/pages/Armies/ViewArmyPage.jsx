import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../../atoms/PageTitle';
import store from '../../Redux/store';
import PageLoading from '../../atoms/PageLoading';
import TextRow from '../../atoms/TextRow';
import findRealSquadName from '../../utilities/findRealSquadName';
import findRealUnitName from '../../utilities/findRealUnitName';
import findRealEquipmentName from '../../utilities/findRealEquipmentName';
import findUnitAbilities from '../../utilities/findUnitAbilities';
import calcSquadNumber from '../../utilities/calcSquadNumber';
import RedirectButton from '../../atoms/RedirectButton';

function ViewArmyPage({ match }) {
  const viewArmyID = match.params.ID;
  const displayArmy = store.getState().userArmies.filter((army) => army.id === viewArmyID)[0];

  return (!displayArmy) ? (<PageLoading />) : (
    <div data-test="ViewArmyPage" className="container-fluid p-padding text-center">
      <PageTitle Title="View Army Page" />
      <RedirectButton redirect={`/armies/edit/${displayArmy.id}`} buttontext="Edit Army" />
      <TextRow left="Army Name:" right={displayArmy.Name} />
      <TextRow left="Points:" right={`${displayArmy.Points}`} />
      <div className="row justify-content-center mt-5">
        <div className="col-xl-8">
          <div className="row h4 text-warning">
            <div className="col-2">Squad</div>
            <div className="col-2">Unit Qty</div>
            <div className="col-2">Unit</div>
            <div className="col-3">Unit Abilities</div>
            <div className="col-3">Gear</div>
          </div>
          {displayArmy.SquadArray.map((roleArray) => (
            <div key={roleArray.Role.id}>
              {(roleArray.Squads.length > 0) ? (
                <div className="row mt-4 border border-secondary">
                  <div className="col-6 text-right text-warning">
                    {roleArray.Role.Name}
                    :
                  </div>
                  <div className="col-6 text-left text-white">{calcSquadNumber(roleArray.Squads)}</div>
                </div>
              ) : <div />}
              {roleArray.Squads.map((squad, index) => (
                <div key={index} className="row text-white">
                  <div className="col-2">{(squad.Squad !== null) ? (findRealSquadName(squad.Squad)) : '' }</div>
                  <div className="col-2">{(squad.UnitQTY !== null) ? (squad.UnitQTY) : ''}</div>
                  <div className="col-2">{(squad.Unit !== null) ? (findRealUnitName(squad.Unit)) : ''}</div>
                  <div className="col-3">{(squad.Unit !== null) ? (findUnitAbilities(squad.Unit)) : ''}</div>
                  <div className="col-3">{findRealEquipmentName(squad.Equipment)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ViewArmyPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      ID: PropTypes.string,
    }),
  }),
};

ViewArmyPage.defaultProps = {
  match: null,
};

export default ViewArmyPage;
