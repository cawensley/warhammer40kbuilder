import React from 'react';
import PageTitle from "../atoms/PageTitle";

function HomePage () {

    return (
        <div data-test="HomePage" className="container-fluid p-padding text-center">
            <PageTitle Title="Home Page" />
        </div>
    )
}

export default HomePage;