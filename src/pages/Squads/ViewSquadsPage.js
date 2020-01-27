import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import CodexFilter from "../../atoms/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";
import DeleteButton from "../../atoms/DeleteButton";
import compareFunction from "../../utilities/compareFunction";
import FirebaseContext from "../../firebase/FirebaseContext";

function ViewSquadsPage () {
    const {codex}=useContext(FirebaseContext);
    const [isLoading, setisLoading] = useState(false);
    const [filteredSquads,setFilteredSquads]=useState([]);
    const [refresh,setRefresh] = useState(false);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("squads").where('Codex','==',codex)
            .get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            rawdata.sort(compareFunction);
            setFilteredSquads(rawdata);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[codex]);

    function spliceThing (input) {
        for (let i = 0; i < filteredSquads.length; i += 1) {
            if (input === filteredSquads[i].id) { filteredSquads.splice(i, 1); }
        }
        setFilteredSquads(filteredSquads);
        setRefresh(!refresh)
    }

    if (isLoading) { return (<PageLoading />); }

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
                    {filteredSquads.map((item)=>(
                        <div key={item.id} className="row text-white align-items-center border border-secondary">
                            <Link to={`/squads/edit/${item.id}`}
                                  className="col-3 p-hyperlink-color">{item.Name}</Link>
                            <div className="col-2">{item.Role}</div>
                            <div className="col-2">{item.MinSize}</div>
                            <div className="col-2">{item.MaxSize}</div>
                            <div className="col-2">
                                {item.Units.map((item)=><div key={item}>{item}</div>)}
                            </div>
                            <div className="col-1"><DeleteButton collectionName={"squads"} uniqueID={item.id} onDelete={spliceThing}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewSquadsPage;