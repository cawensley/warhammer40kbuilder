import React, {useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import RoleRow from "../../molecules/RoleRow";
import store from "../../Redux/store";
import codexFilter from "../../utilities/codexFilter";
import RoleChange from "../../Redux/actions/RoleChange";

function EditSquadsPage ({match}) {
    const editSquadID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [editSquad,setEditSquad] = useState({Codex: store.getState().codex,Name: '',Role: store.getState().role,MinSize: '',MaxSize: '',Units: []});

    function handleNameInput(input) {setEditSquad({...editSquad,Name:input})}
    function handleMinSizeInput(input) {setEditSquad({...editSquad,MinSize:+input})}
    function handleMaxSizeInput(input) {setEditSquad({...editSquad,MaxSize:+input})}
    function handleUnitRemove () {var NewUnit = editSquad.Units;NewUnit.pop();setEditSquad({...editSquad,Units:NewUnit})}
    function handleUnitAdd(input) {var NewUnit = editSquad.Units;NewUnit.push(input);setEditSquad({...editSquad,Units:NewUnit})}

    function getEditSquadInfo () {
        setisLoading(true);
        firebase.db.collection("squads").doc(editSquadID).get()
            .then(doc=>{
                setEditSquad({...editSquad,
                    Name: doc.data().Name,
                    MinSize: doc.data().MinSize,
                    MaxSize:doc.data().MaxSize,
                    Units:doc.data().Units
                });
                store.dispatch(RoleChange(doc.data().Role))
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditSquadInfo()},[]);
    // eslint-disable-next-line
    useEffect(()=>setEditSquad({...editSquad,Codex:store.getState().codex}),[store.getState().codex]);
    // eslint-disable-next-line
    useEffect(()=>setEditSquad({...editSquad,Role:store.getState().role}),[store.getState().role]);

    function handleEditSquadSubmission () {
        firebase.db.collection("squads").doc(editSquadID).set(editSquad);
        window.location.hash = '/squads/view';
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Squads Page" />
            <form onSubmit={handleEditSquadSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Edit Squad Name:" startValue={editSquad.Name} onInputChange={handleNameInput}/>
                <RoleRow left="Edit Army Role:"/>
                <InputRow type="number" left="Edit Min Squad Size:" startValue={editSquad.MinSize} onInputChange={handleMinSizeInput}/>
                <InputRow type="number" left="Edit Max Squad Size:" startValue={editSquad.MaxSize} onInputChange={handleMaxSizeInput}/>
                <SelectArray
                    codexArray={codexFilter(store.getState().units)}
                    left="Units in Squad:"
                    onItemAdd={handleUnitAdd}
                    onItemRemove={handleUnitRemove}
                    arrayDisplay={editSquad.Units}
                />
                <SubmitButton buttontext="Save Changes to Squad"/>
            </form>
        </div>
    )
}

export default EditSquadsPage;