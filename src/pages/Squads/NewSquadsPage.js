import React, {useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../molecules/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import RoleRow from "../../molecules/RoleRow";
import store from "../../Redux/store";
import codexFilter from "../../utilities/codexFilter";

function NewSquadsPage () {
    const [newSquad,setNewSquad] = useState({Codex: store.getState().codex,Name: '',Role: store.getState().role,MinSize: '',MaxSize: '',Units: []});

    function handleNameInput(input) {setNewSquad({...newSquad,Name:input})}
    function handleMinSizeInput(input) {setNewSquad({...newSquad,MinSize:+input})}
    function handleMaxSizeInput(input) {setNewSquad({...newSquad,MaxSize:+input})}
    function handleUnitRemove () {var NewUnit = newSquad.Units;NewUnit.pop();setNewSquad({...newSquad,Units:NewUnit})}
    function handleUnitAdd(input) {var NewUnit = newSquad.Units;NewUnit.push(input);setNewSquad({...newSquad,Units:NewUnit})}

    function handleNewSquadSubmission () {
        firebase.db.collection("squads").add(newSquad);
        window.location.hash = '/squads/view';
    }

    // eslint-disable-next-line
    useEffect(()=>setNewSquad({...newSquad,Codex:store.getState().codex}),[store.getState().codex]);
    // eslint-disable-next-line
    useEffect(()=>setNewSquad({...newSquad,Role:store.getState().role}),[store.getState().role]);

    return (

        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Squads Page" />
            <form onSubmit={handleNewSquadSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="New Squad Name:" startValue={newSquad.Name} onInputChange={handleNameInput}/>
                <RoleRow left="Army Role:"/>
                <InputRow type="number" left="Min Squad Size:" startValue={newSquad.MinSize} onInputChange={handleMinSizeInput}/>
                <InputRow type="number" left="Max Squad Size:" startValue={newSquad.MaxSize} onInputChange={handleMaxSizeInput}/>
                <SelectArray
                    codexArray={codexFilter(store.getState().units)}
                    left="Units in Squad:"
                    onItemAdd={handleUnitAdd}
                    onItemRemove={handleUnitRemove}
                    arrayDisplay={newSquad.Units}
                />
                <SubmitButton buttontext="Add Squad to Database"/>
            </form>
        </div>
    )
}

export default NewSquadsPage;