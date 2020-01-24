import React from 'react';
import PageTitle from "../atoms/PageTitle";
import CodexFilter from "../atoms/CodexFilter";

function HomePage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Home Page" />
            <CodexFilter/>
        </div>
    )
}

export default HomePage;