import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import AddtoDatabaseButton from "../../atoms/AddtoDatabaseButton";

function ViewSquadsPage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Squads Page" />
            <CodexFilter/>
            <AddtoDatabaseButton redirect={"/squads/new"} buttontext={"Add Squads"}/>
        </div>
    )
}

export default ViewSquadsPage;