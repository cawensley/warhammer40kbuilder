import React, {useContext, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import FirebaseContext from "../../firebase/FirebaseContext";

function NewEquipmentPage () {
    const {codex}=useContext(FirebaseContext);
    const [newEquipmentName,setNewEquipmentName] = useState(null);
    const [newEquipmentCost,setNewEquipmentCost] = useState(null);

    function handleNameInput(input) {setNewEquipmentName(input)}
    function handleCostInput(input) {setNewEquipmentCost(input)}

    function newEquipmentSubmission () {
        const newItem = {
            Codex: codex,
            Name: newEquipmentName,
            Cost: newEquipmentCost
        };
        firebase.db.collection("equipment").add(newItem);
        window.alert("New equipment added");
        setNewEquipmentName(null);
        setNewEquipmentCost(null);
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Equipment Page" />
            <form onSubmit={newEquipmentSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Equipment Name:" onInputChange={handleNameInput}/>
                <InputRow type="number" left="Equipment Cost:" onInputChange={handleCostInput}/>
                <SubmitButton buttontext="Add Equipment to Database"/>
            </form>
        </div>
    )
}

export default NewEquipmentPage;