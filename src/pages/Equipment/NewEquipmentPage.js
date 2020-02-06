import React, {useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../molecules/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import store from "../../Redux/store";

function NewEquipmentPage () {
    const [newEquipment,setNewEquipment] = useState({Codex: store.getState().codex,Name: '',Cost:''});

    function handleNameInput(input) {setNewEquipment({...newEquipment,Name:input})}
    function handleCostInput(input) {setNewEquipment({...newEquipment,Cost:+input})}

    // eslint-disable-next-line
    useEffect(()=>setNewEquipment({...newEquipment,Codex:store.getState().codex}),[store.getState().codex]);

    function newEquipmentSubmission () {
        firebase.db.collection("equipment").add(newEquipment);
        window.location.hash = '/equipment/view';
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Equipment Page" />
            <form onSubmit={newEquipmentSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="New Equipment Name:" startValue={newEquipment.Name} onInputChange={handleNameInput}/>
                <InputRow type="number" left="New Equipment Cost:" startValue={newEquipment.Cost} onInputChange={handleCostInput}/>
                <SubmitButton buttontext="Add Equipment to Database"/>
            </form>
        </div>
    )
}

export default NewEquipmentPage;