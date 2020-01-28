import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import TextRow from "../../atoms/TextRow";
import InputRow from "../../atoms/InputRow";
import FirebaseContext from "../../firebase/FirebaseContext";

function EditEquipmentPage ({match}) {
    const {codex}=useContext(FirebaseContext);
    const editEquipmentID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [originalEquipment,setOriginalEquipment]=useState({Name: null,Cost:null});
    const [editEquipment,setEditEquipment] = useState({Codex: codex,Name: null,Cost:null});

    function handleNameInput(input) {setEditEquipment({...editEquipment,Name:input})}
    function handleCostInput(input) {setEditEquipment({...editEquipment,Cost:+input})}

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("equipment").doc(editEquipmentID).get()
            .then(doc=>{
                setOriginalEquipment({Name: doc.data().Name, Cost:doc.data().Cost});
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
                <TextRow left="Current Name:" right={originalEquipment.Name}/>
                <InputRow type="text" left="New Equipment Name:" onInputChange={handleNameInput}/>
                <TextRow left="Current Cost:" right={originalEquipment.Cost}/>
                <InputRow type="number" left="New Equipment Cost:" onInputChange={handleCostInput}/>
                <SubmitButton buttontext={"Save Changes to Equipment"}/>
            </form>
        </div>
    )
}

export default EditEquipmentPage;