import React, {useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../atoms/SelectArray";
import DisplayArray from "../../atoms/DisplayArray";

function NewUnitsPage () {
    const [newUnitName,setNewUnitName] = useState(null);
    const [newUnitCost,setNewUnitCost] = useState(null);
    const [newUnitGear,setNewUnitGear] = useState([]);

    function handleNameInput(input) {setNewUnitName(input)}
    function handleCostInput(input) {setNewUnitCost(input)}
    function handleGearRemove () {var NewGear = newUnitGear;NewGear.pop();setNewUnitGear(NewGear);}
    function handleGearAdd(input) {var NewGear = newUnitGear;NewGear.push(input);setNewUnitGear(NewGear);}

    function handleNewUnitSubmission () {
        const newUnit = {
            Codex: store.getState().codexSelection,
            Name: newUnitName,
            Cost: newUnitCost,
            Gear: newUnitGear
        };
        firebase.db.collection("units").add(newUnit);
        window.location.hash = '/units/view';
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Units Page" />
            <form onSubmit={handleNewUnitSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Unit Name:" onInputChange={handleNameInput}/>
                <InputRow type="number" left="Unit Cost:" onInputChange={handleCostInput}/>
                <SelectArray collectionName="equipment" left="Unit Gear:" onItemAdd={handleGearAdd} onItemRemove={handleGearRemove}/>
                <DisplayArray collectionName="equipment" left="Gear Selected:" array={newUnitGear}/>
                <SubmitButton buttontext="Add Unit to Database"/>
            </form>
        </div>
    )
}

export default NewUnitsPage;