import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import CodexFilter from "../../atoms/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";
import store from '../../Redux/store';
import DeleteButton from "../../atoms/DeleteButton";
import compareFunction from "../../utilities/compareFunction";

function ViewUnitsPage () {
    const [isLoading, setisLoading] = useState(false);
    const [filteredUnits,setFilteredUnits]=useState([]);
    const [refresh,setRefresh] = useState(false);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("units").where('Codex','==',store.getState().codexSelection)
            .get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            rawdata.sort(compareFunction);
            setFilteredUnits(rawdata);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);

    function spliceThing (input) {
        const currentArray = filteredUnits;
        console.log("Original Units to display are = ",currentArray);
        console.log("ID to splice is = ",input);
        for (let i = 0; i < currentArray.length; i += 1) {
            if (input === currentArray[i].id) { currentArray.splice(i, 1); }
        }
        setFilteredUnits(currentArray);
        console.log("New array =",currentArray);
        setRefresh(!refresh)
    }

    if (isLoading) { return (<PageLoading />); }

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
                    {filteredUnits.map((item)=>(
                        <div key={item.id} className="row text-white align-items-center border border-secondary">
                            <Link to={`/units/edit/${item.id}`}
                                  className="col-3 p-hyperlink-color">{item.Name}</Link>
                            <div className="col-3">{item.Cost}</div>
                            <div className="col-3">
                                {item.Gear.map((item)=><div key={item}>{item}</div>)}
                            </div>
                            <div className="col-3"><DeleteButton collectionName={"units"} uniqueID={item.id} onDelete={spliceThing}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewUnitsPage;