import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import store from '../../Redux/store';
import squads from '../../Redux/reducers/squads';
import codexFilter from '../../utilities/codexFilter';
import { findRealRoleName, findRealUnitName } from '../../utilities/findName';
import DisplayLink from '../../atoms/DisplayLink';
import DisplayText from '../../atoms/DisplayText';

const ViewSquadsPage = () => (
  <div data-test="ViewSquadsPage" className="container p-padding text-md-center">
    <PageTitle Title="View Squads Page" />
    <CodexFilter />
    <RedirectButton redirect="/squads/new" buttontext="Add Squads" />
    <h3 className="d-none d-md-flex row text-warning">
      <div className="col-3">Name</div>
      <div className="col-2">Role</div>
      <div className="col-1 h5">Min. Size</div>
      <div className="col-1 h5">Max. Size</div>
      <div className="col-3">Units</div>
      <div className="col-2" />
    </h3>
    {codexFilter(store.getState().squads).map((squad) => (
      <div
        data-test="squadsDisplay"
        key={squad.id}
        className="row text-white align-items-center border border-secondary  py-2 py-md-0"
      >
        <DisplayLink columns={3} leftText="Name" rightText={squad.Name} linkID={`/squads/edit/${squad.id}`} userID={squad.userID} />
        <DisplayText columns={2} leftText="Role" rightText={findRealRoleName(squad.Role)} />
        <DisplayText columns={1} leftText="Min Size" rightText={`${squad.MinSize}`} />
        <DisplayText columns={1} leftText="Max Size" rightText={`${squad.MaxSize}`} />
        <div className="col-md-3 d-flex d-inline-block justify-content-md-center">
          <div className="d-md-none align-content-center text-warning">Units:&nbsp;</div>
          <div className="d-flex flex-wrap justify-content-md-center">
            {squad.Units.map((item) => <div key={uuidv4()}>{findRealUnitName(item)}</div>)}
          </div>
        </div>
        <div className="col-md-2 text-center">
          {(squad.userID === store.getState().user.uid)
            ? (<DeleteButton collectionName="squads" uniqueID={squad.id} uniqueName={squad.Name} />)
            : <div className="p-buttonpaddingEquivalent" />}
        </div>
      </div>
    ))}
  </div>
);

export default connect(squads)(ViewSquadsPage);
