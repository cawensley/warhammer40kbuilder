import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";
import DeleteButton from "../../molecules/DeleteButton";
import FirebaseContext from "../../firebase/FirebaseContext";
import IDtoName from "../../atoms/IDtoName";

function ViewUnitsPage () {
    const {codexUnits,codexEquipment}=useContext(FirebaseContext);

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Units Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/units/new"} buttontext={"Add Units"}/>
            <div className="row justify-content-center mt-4">
                <div className="col-xl-6 col-md-10">
                    <div className="row h3 text-warning">
                        <div className="col-3">Name</div>
                        <div className="col-3">Cost</div>
                        <div className="col-3">Gear</div>
                        <div className="col-3"></div>
                    </div>
                    {codexUnits.map((item)=>(
                        <div key={item.id} className="row text-white align-items-center border border-secondary">
                            <Link to={`/units/edit/${item.id}`}
                                  className="col-3 p-hyperlink-color">{item.Name}</Link>
                            <div className="col-3">{item.Cost}</div>
                            <div className="col-3">
                                {item.Gear.map((item)=><IDtoName key={item} searchArray={codexEquipment} uniqueID={item}/>)}
                            </div>
                            <div className="col-3"><DeleteButton collectionName={"units"} uniqueID={item.id}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewUnitsPage;