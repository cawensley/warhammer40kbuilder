import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";

function ViewArmiesPage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Armies Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/armies/new"} buttontext={"Add Armies"}/>
        </div>
    )
}

export default ViewArmiesPage;