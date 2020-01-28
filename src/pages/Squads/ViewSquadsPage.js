import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";
import DeleteButton from "../../molecules/DeleteButton";
import FirebaseContext from "../../firebase/FirebaseContext";
import IDtoName from "../../atoms/IDtoName";

function ViewSquadsPage () {
    const {codexSquads,codexUnits,roles}=useContext(FirebaseContext);

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Squads Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/squads/new"} buttontext={"Add Squads"}/>
            <div className="row justify-content-center mt-4">
                <div className="col-xl-8">
                    <div className="row h3 text-warning">
                        <div className="col-3">Name</div>
                        <div className="col-2">Role</div>
                        <div className="col-2">Min. Size</div>
                        <div className="col-2">Max. Size</div>
                        <div className="col-2">Units</div>
                        <div className="col-1"></div>
                    </div>
                    {codexSquads.map((item)=>(
                        <div key={item.id} className="row text-white align-items-center border border-secondary">
                            <Link to={`/squads/edit/${item.id}`}
                                  className="col-3 p-hyperlink-color">{item.Name}</Link>
                            <div className="col-2"><IDtoName searchArray={roles} uniqueID={item.Role}/></div>
                            <div className="col-2">{item.MinSize}</div>
                            <div className="col-2">{item.MaxSize}</div>
                            <div className="col-2">
                                {item.Units.map((item)=><IDtoName key={item} searchArray={codexUnits} uniqueID={item}/>)}
                            </div>
                            <div className="col-1"><DeleteButton collectionName={"squads"} uniqueID={item.id}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewSquadsPage;