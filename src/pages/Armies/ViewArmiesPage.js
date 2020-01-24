import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import AddtoDatabaseButton from "../../atoms/AddtoDatabaseButton";

function ViewArmiesPage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Armies Page" />
            <CodexFilter/>
            <AddtoDatabaseButton redirect={"/armies/new"} buttontext={"Add Armies"}/>
        </div>
    )
}

export default ViewArmiesPage;