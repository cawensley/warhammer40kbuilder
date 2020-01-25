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

    function getEquipmentData () {
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
    useEffect(()=>{getEquipmentData()},[]);


    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Equipment Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/equipment/new"} buttontext={"Add Equipment"}/>
            <div className="row justify-content-center mt-4">
                <div className="col-xl-8">
                    <div className="row h3 text-warning">
                        <div className="col-md-2"/>
                        <div className="col-5 col-md-4">Name</div>
                        <div className="col-4 col-md-4">Cost</div>
                        <div className="col-3 col-md-2"></div>
                    </div>
                    {filteredEquipment.map((item)=>(
                        <div key={item.id} className="row text-white">
                            <div className="col-md-2"/>
                            <Link to={`/equipment/edit/${item.id}`}
                                  className="col-5 col-md-4 border border-secondary p-hyperlink-color">{item.Name}</Link>
                            <div className="col-4 col-md-4 border border-secondary">{item.Cost}</div>
                            <div className="col-3 col-md-2 text-left"><DeleteButton collectionName={"equipment"} uniqueID={item.id}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewEquipmentPage;