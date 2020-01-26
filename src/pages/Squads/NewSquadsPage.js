import React, {useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../atoms/SelectArray";
import DisplayArray from "../../atoms/DisplayArray";
import RoleRow from "../../atoms/RoleRow";

function NewSquadsPage () {
    const [newSquadName,setNewSquadName] = useState(null);
    const [newSquadRole,setNewSquadRole] = useState(null);
    const [newSquadMinSize,setNewSquadMinSize] = useState(null);
    const [newSquadMaxSize,setNewSquadMaxSize] = useState(null);
    const [newSquadUnits,setNewSquadUnits] = useState([]);
    const [refresh,setRefresh] = useState(false);

    function handleNameInput(input) {setNewSquadName(input)}
    function handleRoleInput(input) {setNewSquadRole(input)}
    function handleMinSizeInput(input) {setNewSquadMinSize(input)}
    function handleMaxSizeInput(input) {setNewSquadMaxSize(input)}
    function handleUnitRemove () {var NewUnit = newSquadUnits;NewUnit.pop();setNewSquadUnits(NewUnit);setRefresh(!refresh)}
    function handleUnitAdd(input) {var NewUnit = newSquadUnits;NewUnit.push(input);setNewSquadUnits(NewUnit);setRefresh(!refresh)}

    function handleNewSquadSubmission () {
        const newSquad = {
            Codex: store.getState().codexSelection,
            Name: newSquadName,
            Role: newSquadRole,
            MinSize: newSquadMinSize,
            MaxSize: newSquadMaxSize,
            Units: newSquadUnits
        };
        firebase.db.collection("squads").add(newSquad);
        window.location.hash = '/squads/view';
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Squads Page" />
            <form onSubmit={handleNewSquadSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Squad Name:" onInputChange={handleNameInput}/>
                <RoleRow left="Army Role:" onInputChange={handleRoleInput}/>
                <InputRow type="number" left="Min Squad Size:" onInputChange={handleMinSizeInput}/>
                <InputRow type="number" left="Max Squad Size:" onInputChange={handleMaxSizeInput}/>
                <SelectArray collectionName="units" left="Units in Squad:" onItemAdd={handleUnitAdd} onItemRemove={handleUnitRemove}/>
                <DisplayArray collectionName="units" left="Units Added:" array={newSquadUnits}/>
                <SubmitButton buttontext="Add Squad to Database"/>
            </form>
        </div>
    )
}

export default NewSquadsPage;