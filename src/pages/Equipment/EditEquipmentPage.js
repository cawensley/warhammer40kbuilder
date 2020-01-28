import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import FirebaseContext from "../../firebase/FirebaseContext";

function EditEquipmentPage ({match}) {
    const {codex}=useContext(FirebaseContext);
    const editEquipmentID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [editEquipment,setEditEquipment] = useState({Codex: codex,Name: '',Cost:''});

    function handleNameInput(input) {setEditEquipment({...editEquipment,Name:input})}
    function handleCostInput(input) {setEditEquipment({...editEquipment,Cost:+input})}

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("equipment").doc(editEquipmentID).get()
            .then(doc=>{
                setEditEquipment({...editEquipment,Name: doc.data().Name, Cost:doc.data().Cost})
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditItemInfo()},[]);
    // eslint-disable-next-line
    useEffect(()=>setEditEquipment({...editEquipment,Codex:codex}),[codex]);

    function handleEditItemSubmission () {
        firebase.db.collection("equipment").doc(editEquipmentID).set(editEquipment);
        window.location.hash = '/equipment/view';
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Equipment Page" />
            <form onSubmit={handleEditItemSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Edit Equipment Name:" startValue={editEquipment.Name} onInputChange={handleNameInput}/>
                <InputRow type="number" left="Edit Equipment Cost:" startValue={editEquipment.Cost} onInputChange={handleCostInput}/>
                <SubmitButton buttontext={"Save Changes to Equipment"}/>
            </form>
        </div>
    )
}

export default EditEquipmentPage;