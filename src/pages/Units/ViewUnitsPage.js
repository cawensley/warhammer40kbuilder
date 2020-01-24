import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";

function ViewUnitsPage () {

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Units Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/units/new"} buttontext={"Add Units"}/>
        </div>
    )
}

export default ViewUnitsPage;