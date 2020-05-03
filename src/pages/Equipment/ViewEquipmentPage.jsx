import React from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import store from '../../Redux/store';
import equipment from '../../Redux/reducers/equipment';
import codexFilter from '../../utilities/codexFilter';
import DisplayText from '../../atoms/DisplayText';
import DisplayLink from '../../atoms/DisplayLink';

const ViewEquipmentPage = () => (
  <div data-test="ViewEquipmentPage" className="container p-padding text-center">
    <PageTitle Title="View Equipment Page" />
    <CodexFilter />
    <RedirectButton redirect="/equipment/new" buttontext="Add Equipment" />
    <h3 className="d-none d-md-flex row text-warning">
      <div className="col-6">Name</div>
      <div className="col-3">Cost</div>
      <div className="col-3" />
    </h3>
    {codexFilter(store.getState().equipment).map((item) => (
      <div
        data-test="equipDisplay"
        key={item.id}
        className="row text-white align-items-center border border-secondary py-2 py-md-0"
      >
        <DisplayLink columns={6} leftText="Name" rightText={item.Name} linkID={`/equipment/edit/${item.id}`} userID={item.userID} />
        <DisplayText columns={3} leftText="Cost" rightText={`${item.Cost}`} />
        <div className="col-md-3">
          {(item.userID === store.getState().user.uid)
            ? (<DeleteButton collectionName="equipment" uniqueID={item.id} uniqueName={item.Name} />)
            : <div className="p-buttonpaddingEquivalent" /> }
        </div>
      </div>
    ))}
  </div>
);

export default connect(equipment)(ViewEquipmentPage);
