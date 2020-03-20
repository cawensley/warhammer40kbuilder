import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../atoms/PageTitle';
import store from '../Redux/store';
import './HomePage.scss';

function HomePage() {
  return (
    <div data-test="HomePage" className="container-fluid p-padding text-center">
      <PageTitle Title="Home Page" />
      {(store.getState().user) ? (
        <div>
          <h3 className="text-white-50"><i>Most Recent Armies Added</i></h3>
          <div className="row justify-content-center mt-4">
            <div className="col-xl-8">
              <h3 className="row text-warning">
                <div className="col-4">Name</div>
                <div className="col-4">Points</div>
                <div className="col-4">Date Created</div>
              </h3>
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
          <img className="border border-secondary p-image-sizeSmall mt-4" alt="Error Loading" src={require('../utilities/Necron_Frontpage.jpg')} />
        </div>
      ) : (
        <div>
          <h3 className="text-info"><i>Login to see the Most Recent Armies Added</i></h3>
          <img className="border border-secondary p-image-sizeBig mt-4" alt="Error Loading" src={require('../utilities/Necron_Frontpage.jpg')} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
