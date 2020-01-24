import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";

function NewSquadsPage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Squads Page" />
            <CodexFilter/>
        </div>
    )
}

export default NewSquadsPage;