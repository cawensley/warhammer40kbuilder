import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import CodexFilter from "../../atoms/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";
import store from '../../Redux/store';
import DeleteButton from "../../atoms/DeleteButton";
import IDtoName from "../../atoms/IDtoName";

function ViewSquadsPage () {
    const [isLoading, setisLoading] = useState(false);
    const [filteredUnits,setFilteredUnits]=useState([]);
    const [filteredSquads,setFilteredSquads]=useState([]);
    const [roles,setRoles]=useState([]);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("units").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            const filterArray = rawdata.filter((item)=>item.Codex.includes(store.getState().codexSelection));
            setFilteredUnits(filterArray);
        });
        firebase.db.collection("squads").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            const filterArray = rawdata.filter((item)=>item.Codex.includes(store.getState().codexSelection));
            setFilteredSquads(filterArray);
        });
        firebase.db.collection("Roles").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            setRoles(rawdata);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);

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
                            <div className="col-2"><IDtoName searchArray={roles} uniqueID={item.Role}/></div>
                            <div className="col-2">{item.MinSize}</div>
                            <div className="col-2">{item.MaxSize}</div>
                            <div className="col-2">
                                {item.Units.map((item)=><IDtoName key={item} searchArray={filteredUnits} uniqueID={item}/>)}
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