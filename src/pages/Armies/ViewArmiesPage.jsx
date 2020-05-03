import React from 'react';
import PageTitle from '../../atoms/PageTitle';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import store from '../../Redux/store';
import DisplayText from '../../atoms/DisplayText';
import DisplayLink from '../../atoms/DisplayLink';

const ViewArmiesPage = () => {
  if (store.getState().userArmies.length === 0) {
    return (
      <div data-test="ViewArmiesPage" className="container p-padding text-md-center">
        <PageTitle Title="View Armies Page" />
        <RedirectButton redirect="/armies/new" buttontext="Add Army" />
        <h3 className="text-warning"><i>No armies currently saved to your account</i></h3>
      </div>
    );
  }

  return (
    <div data-test="ViewArmiesPage" className="container p-padding text-md-center">
      <PageTitle Title="View Armies Page" />
      <RedirectButton redirect="/armies/new" buttontext="Add Army" />
      <h3 className="d-none d-md-flex row text-warning">
        <div className="col-3">Name</div>
        <div className="col-3">Points</div>
        <div className="col-3">Date Created</div>
        <div className="col-3" />
      </h3>
      {store.getState().userArmies.map((army) => (
        <div
          data-test="armyDisplay"
          key={army.id}
          className="row text-white align-items-center border border-secondary py-2 py-md-0"
        >
          <DisplayLink columns={3} leftText="Name" rightText={army.Name} linkID={`/armies/view/${army.id}`} userID="99999" />
          <DisplayText columns={3} leftText="Points" rightText={`${army.Points}`} />
          <DisplayText columns={3} leftText="Date Created" rightText={`${army.Date.Month + 1}/${army.Date.Day}/${army.Date.Year}`} />
          <div className="col-md-3 text-center"><DeleteButton collectionName="armies" uniqueID={army.id} uniqueName={army.Name} /></div>
        </div>
      ))}
    </div>
  );
};

export default ViewArmiesPage;
