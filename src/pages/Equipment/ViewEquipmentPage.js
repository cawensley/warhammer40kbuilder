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

function ViewEquipmentPage () {
    const {codex}=useContext(FirebaseContext);
    const [isLoading, setisLoading] = useState(false);
    const [filteredEquipment,setFilteredEquipment]=useState([]);
    const [refresh,setRefresh] = useState(false);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("equipment").where('Codex','==',codex)
            .get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            rawdata.sort(compareFunction);
            setFilteredEquipment(rawdata);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[codex]);

    function spliceThing (input) {
        for (let i = 0; i < filteredEquipment.length; i += 1) {
            if (input === filteredEquipment[i].id) { filteredEquipment.splice(i, 1); }
        }
        setFilteredEquipment(filteredEquipment);
        setRefresh(!refresh)
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Equipment Page" />
            <CodexFilter/>
            <RedirectButton redirect={"/equipment/new"} buttontext={"Add Equipment"}/>
            <div className="row justify-content-center mt-4">
                <div className="col-xl-6 col-md-10">
                    <div className="row h3 text-warning">
                        <div className="col-5">Name</div>
                        <div className="col-4">Cost</div>
                        <div className="col-3"></div>
                    </div>
                    {filteredEquipment.map((item)=>(
                        <div key={item.id} className="row text-white border border-secondary">
                            <Link to={`/equipment/edit/${item.id}`}
                                  className="col-5 p-hyperlink-color">{item.Name}</Link>
                            <div className="col-4">{item.Cost}</div>
                            <div className="col-3"><DeleteButton collectionName={"equipment"} uniqueID={item.id} onDelete={spliceThing}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewEquipmentPage;