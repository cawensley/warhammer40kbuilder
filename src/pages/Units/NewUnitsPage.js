import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../molecules/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import FirebaseContext from "../../firebase/FirebaseContext";

function NewUnitsPage () {
    const {codex,codexEquipment}=useContext(FirebaseContext);
    const [newUnit,setNewUnit] = useState({Codex: codex,Name: null,Cost: null,Gear: []});

    function handleNameInput(input) {setNewUnit({...newUnit,Name:input})}
    function handleCostInput(input) {setNewUnit({...newUnit,Cost:+input})}
    function handleGearRemove () {var NewGear = newUnit.Gear;NewGear.pop();setNewUnit({...newUnit,Gear:NewGear})}
    function handleGearAdd(input) {var NewGear = newUnit.Gear;NewGear.push(input);setNewUnit({...newUnit,Gear:NewGear})}

    function handleNewUnitSubmission () {
        firebase.db.collection("units").add(newUnit);
        window.location.hash = '/units/view';
    }

    // eslint-disable-next-line
    useEffect(()=>setNewUnit({...newUnit,Codex:codex}),[codex]);

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Units Page" />
            <form onSubmit={handleNewUnitSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Unit Name:" onInputChange={handleNameInput}/>
                <InputRow type="number" left="Unit Cost:" onInputChange={handleCostInput}/>
                <SelectArray
                    codexArray={codexEquipment}
                    left="Gear:"
                    onItemAdd={handleGearAdd}
                    onItemRemove={handleGearRemove}
                    arrayDisplay={newUnit.Gear}
                />
                <SubmitButton buttontext="Add Unit to Database"/>
            </form>
        </div>
    )
}

export default NewUnitsPage;