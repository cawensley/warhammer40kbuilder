import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../atoms/PageTitle';
import store from '../Redux/store';

function HomePage() {
  return (
    <div data-test="HomePage" className="container-fluid p-padding text-center">
      <PageTitle Title="Home Page" />
      <div className="h3 text-white-50"><i>Recently Added Armies</i></div>
      {(store.getState().homeArmies.length > 0) ? (
        <div className="row justify-content-center mt-4">
          <div className="col-xl-8">
            <div className="row h3 text-warning">
              <div className="col-4">Name</div>
              <div className="col-4">Points</div>
              <div className="col-4">Date Created</div>
            </div>
            {store.getState().homeArmies.map((army) => (
              <div data-test="armyDisplay" key={army.id} className="row text-white align-items-center border border-secondary">
                <Link
                  to={`/armies/view/${army.id}`}
                  className="col-4 p-hyperlink-color"
                >
                  {army.Name}
                </Link>
                <div className="col-4">{army.Points}</div>
                <div className="col-4">
                  {army.Date.Month + 1}
                  /
                  {army.Date.Day}
                  /
                  {army.Date.Year}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : <div />}
    </div>
  );
}

export default HomePage;
