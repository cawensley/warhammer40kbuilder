import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import store from '../../Redux/store';
import units from '../../Redux/reducers/units';
import codexFilter from '../../utilities/codexFilter';
import { findRealEquipmentName } from '../../utilities/findName';
import DisplayLink from '../../atoms/DisplayLink';
import DisplayText from '../../atoms/DisplayText';

const ViewUnitsPage = () => (
  <div data-test="ViewUnitsPage" className="container p-padding text-md-center">
    <PageTitle Title="View Units Page" />
    <CodexFilter />
    <RedirectButton redirect="/units/new" buttontext="Add Units" />
    <h3 className="d-none d-md-flex row text-warning">
      <div className="col-2">Name</div>
      <div className="col-1">Cost</div>
      <div className="col-4">Abilities</div>
      <div className="col-3">Gear</div>
      <div className="col-2" />
    </h3>
    {codexFilter(store.getState().units).map((unit) => (
      <div
        data-test="unitsDisplay"
        key={unit.id}
        className="row text-white align-items-center border border-secondary py-2 py-md-0"
      >
        <DisplayLink columns={2} leftText="Name" rightText={unit.Name} linkID={`/units/edit/${unit.id}`} userID={unit.userID} />
        <DisplayText columns={1} leftText="Cost" rightText={`${unit.Cost}`} />
        <DisplayText columns={4} leftText="Abilities" rightText={unit.Abilities} />
        <div className="col-md-3 d-flex d-inline-block justify-content-md-center">
          <div className="d-md-none align-content-center text-warning">Gear:&nbsp;</div>
          <div className="d-flex flex-wrap justify-content-md-center">
            {unit.Gear.map(
              (item) => <div className="mr-2" key={uuidv4()}>{findRealEquipmentName(item)}</div>,
            )}
          </div>
        </div>
        <div className="col-md-2 text-center">
          {(unit.userID === store.getState().user.uid)
            ? (<DeleteButton collectionName="units" uniqueID={unit.id} uniqueName={unit.Name} />)
            : <div className="p-buttonpaddingEquivalent" />}
        </div>
      </div>
    ))}
  </div>
);

export default connect(units)(ViewUnitsPage);
