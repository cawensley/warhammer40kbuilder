import React from 'react';
import {Link} from "react-router-dom";
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";
import DeleteButton from "../../molecules/DeleteButton";
import IDtoName from "../../atoms/IDtoName";
import store from "../../Redux/store";
import {connect} from 'react-redux';
import units from "../../Redux/reducers/units";
import codexFilter from "../../utilities/codexFilter";

function ViewUnitsPage () {

    return (
        <div data-test="ViewUnitsPage" className="container-fluid p-padding text-center">
            <PageTitle Title="View Units Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/units/new"} buttontext={"Add Units"}/>
            <div className="row justify-content-center mt-4">
                <div className="col-xl-8">
                    <div className="row h3 text-warning">
                        <div className="col-2">Name</div>
                        <div className="col-2">Cost</div>
                        <div className="col-2">Abilities</div>
                        <div className="col-3">Gear</div>
                        <div className="col-3"></div>
                    </div>
                    {codexFilter(store.getState().units).map((item)=>(
                        <div data-test="unitsDisplay" key={item.id} className="row text-white align-items-center border border-secondary">
                            <Link to={`/units/edit/${item.id}`}
                                  className="col-2 p-hyperlink-color">{item.Name}</Link>
                            <div className="col-2">{item.Cost}</div>
                            <div className="col-2">{item.Abilities}</div>
                            <div className="col-3">
                                {item.Gear.map((item)=><IDtoName key={item} searchArray={codexFilter(store.getState().equipment)} uniqueID={item}/>)}
                            </div>
                            <div className="col-3"><DeleteButton collectionName={"units"} uniqueID={item.id}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default connect(units)(ViewUnitsPage);