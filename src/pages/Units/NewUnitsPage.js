import React, {useContext, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../atoms/SelectArray";
import DisplayArray from "../../atoms/DisplayArray";
import FirebaseContext from "../../firebase/FirebaseContext";

function NewUnitsPage () {
    const {codex}=useContext(FirebaseContext);
    const [newUnitName,setNewUnitName] = useState(null);
    const [newUnitCost,setNewUnitCost] = useState(null);
    const [newUnitGear,setNewUnitGear] = useState([]);
    const [refresh,setRefresh] = useState(false);

    function handleNameInput(input) {setNewUnitName(input)}
    function handleCostInput(input) {setNewUnitCost(input)}
    function handleGearRemove () {var NewGear = newUnitGear;NewGear.pop();setNewUnitGear(NewGear);setRefresh(!refresh)}
    function handleGearAdd(input) {var NewGear = newUnitGear;NewGear.push(input);setNewUnitGear(NewGear);setRefresh(!refresh)}

    function handleNewUnitSubmission () {
        const newUnit = {
            Codex: codex,
            Name: newUnitName,
            Cost: newUnitCost,
            Gear: newUnitGear
        };
        firebase.db.collection("units").add(newUnit);
        window.alert("New unit added");
        setNewUnitName(null);
        setNewUnitCost(null);
        setNewUnitGear([]);
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Units Page" />
            <form onSubmit={handleNewUnitSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Unit Name:" onInputChange={handleNameInput}/>
                <InputRow type="number" left="Unit Cost:" onInputChange={handleCostInput}/>
                <SelectArray collectionName="equipment" left="Unit Gear:" onItemAdd={handleGearAdd} onItemRemove={handleGearRemove}/>
                <DisplayArray left="Gear Selected:" array={newUnitGear}/>
                <SubmitButton buttontext="Add Unit to Database"/>
            </form>
        </div>
    )
}

export default NewUnitsPage;