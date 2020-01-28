import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../molecules/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import FirebaseContext from "../../firebase/FirebaseContext";

function NewEquipmentPage () {
    const {codex}=useContext(FirebaseContext);
    const [newEquipment,setNewEquipment] = useState({Codex: codex,Name: null,Cost:null});

    function handleNameInput(input) {setNewEquipment({...newEquipment,Name:input})}
    function handleCostInput(input) {setNewEquipment({...newEquipment,Cost:+input});
        console.log("Equipment Cost value is: ",newEquipment.Cost)}

    function newEquipmentSubmission () {
        console.log("Item to be added is:",newEquipment);
        firebase.db.collection("equipment").add(newEquipment);
        window.location.hash = '/equipment/view';
    }

    // eslint-disable-next-line
    useEffect(()=>setNewEquipment({...newEquipment,Codex:codex}),[codex]);

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