import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";

function NewUnitsPage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Units Page" />
            <CodexFilter/>
        </div>
    )
}

export default NewUnitsPage;