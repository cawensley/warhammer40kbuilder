import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import CodexFilter from "../../atoms/CodexFilter";
import RedirectButton from "../../atoms/RedirectButton";
import store from '../../Redux/store';
import DeleteButton from "../../atoms/DeleteButton";

function ViewEquipmentPage () {
    const [isLoading, setisLoading] = useState(false);
    const [filteredEquipment,setFilteredEquipment]=useState([]);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("equipment").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            const filterArray = rawdata.filter((item)=>item.Codex.includes(store.getState().codexSelection));
            setFilteredEquipment(filterArray);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);


    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Equipment Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/equipment/new"} buttontext={"Add Equipment"}/>
            <div className="row justify-content-center text-warning h3 mt-4">
                <div className="col-md-10 col-xl-8">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-4">Name</div>
                        <div className="col-4">Cost</div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center text-white">
                <div className="col-md-10 col-xl-8">
                    {filteredEquipment.map((item)=>(
                        <div key={item.id} className="row">
                            <div className="col-2"></div>
                            <Link to={`/equipment/edit/${item.id}`}
                                  className="col-4 border border-secondary p-hyperlink-color">{item.Name}</Link>
                            <div className="col-4 border border-secondary">{item.Cost}</div>
                            <div className="col-2 text-left"><DeleteButton collectionName={"equipment"} uniqueID={item.id}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewEquipmentPage;