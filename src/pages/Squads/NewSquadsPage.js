import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../molecules/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import RoleRow from "../../molecules/RoleRow";
import FirebaseContext from "../../firebase/FirebaseContext";

function NewSquadsPage () {
    const {codex,role,codexUnits}=useContext(FirebaseContext);
    const [newSquad,setNewSquad] = useState({Codex: codex,Name: null,Role: role,MinSize: null,MaxSize: null,Units: []});

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
    useEffect(()=>setNewSquad({...newSquad,Codex:codex}),[codex]);
    // eslint-disable-next-line
    useEffect(()=>setNewSquad({...newSquad,Role:role}),[role]);

    return (

        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Squads Page" />
            <form onSubmit={handleNewSquadSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Squad Name:" onInputChange={handleNameInput}/>
                <RoleRow left="Army Role:"/>
                <InputRow type="number" left="Min Squad Size:" onInputChange={handleMinSizeInput}/>
                <InputRow type="number" left="Max Squad Size:" onInputChange={handleMaxSizeInput}/>
                <SelectArray
                    codexArray={codexUnits}
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