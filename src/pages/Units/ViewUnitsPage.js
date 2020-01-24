import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import AddtoDatabaseButton from "../../atoms/AddtoDatabaseButton";

function ViewUnitsPage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Units Page" />
            <CodexFilter/>
            <AddtoDatabaseButton redirect={"/units/new"} buttontext={"Add Units"}/>
        </div>
    )
}

export default ViewUnitsPage;