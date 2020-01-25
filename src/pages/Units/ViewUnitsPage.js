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

function ViewUnitsPage () {
    const [isLoading, setisLoading] = useState(false);
    const [filteredUnits,setFilteredUnits]=useState([]);

    function getUnitsData () {
        setisLoading(true);
        firebase.db.collection("units").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            const filterArray = rawdata.filter((item)=>item.Codex.includes(store.getState().codexSelection));
            setFilteredUnits(filterArray);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getUnitsData()},[]);


    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Units Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/units/new"} buttontext={"Add Units"}/>
            <div className="row justify-content-center mt-4">
                <div className="col-xl-8">
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
                                {item.Gear.map((item)=><IDtoName key={item} collectionName={"equipment"} uniqueID={item}/>)}
                            </div>
                            <div className="col-3 text-left"><DeleteButton collectionName={"units"} uniqueID={item.id}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewUnitsPage;