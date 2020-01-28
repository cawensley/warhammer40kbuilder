import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import TextRow from "../../atoms/TextRow";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import RoleRow from "../../molecules/RoleRow";
import FirebaseContext from "../../firebase/FirebaseContext";
import IDtoName from "../../atoms/IDtoName";

function EditSquadsPage ({match}) {
    const {codex,role,roles,codexUnits}=useContext(FirebaseContext);
    const editSquadID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [originalSquad,setOriginalSquad]=useState({Name: null,Role: null,MinSize:null,MaxSize:null});
    const [editSquad,setEditSquad] = useState({Codex: codex,Name: null,Role: role,MinSize: null,MaxSize: null,Units: []});

    function handleNameInput(input) {setEditSquad({...editSquad,Name:input})}
    function handleMinSizeInput(input) {setEditSquad({...editSquad,MinSize:+input})}
    function handleMaxSizeInput(input) {setEditSquad({...editSquad,MaxSize:+input})}
    function handleUnitRemove () {var NewUnit = editSquad.Units;NewUnit.pop();setEditSquad({...editSquad,Units:NewUnit})}
    function handleUnitAdd(input) {var NewUnit = editSquad.Units;NewUnit.push(input);setEditSquad({...editSquad,Units:NewUnit})}

    function getEditSquadInfo () {
        setisLoading(true);
        firebase.db.collection("squads").doc(editSquadID).get()
            .then(doc=>{
                setOriginalSquad({
                    Name: doc.data().Name,
                    Role: doc.data().Role,
                    MinSize: doc.data().MinSize,
                    MaxSize:doc.data().MaxSize});
                setEditSquad({...editSquad,Units:doc.data().Units})
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditSquadInfo()},[]);
    // eslint-disable-next-line
    useEffect(()=>setEditSquad({...editSquad,Codex:codex}),[codex]);
    // eslint-disable-next-line
    useEffect(()=>setEditSquad({...editSquad,Role:role}),[role]);

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
                <TextRow left="Current Name:" right={originalSquad.Name}/>
                <InputRow type="text" left="New Squad Name:" onInputChange={handleNameInput}/>
                <TextRow left="Current Role:" right={<IDtoName searchArray={roles} uniqueID={originalSquad.Role}/>}/>
                <RoleRow left="New Army Role:"/>
                <TextRow left="Current Min. Size:" right={originalSquad.MinSize}/>
                <InputRow type="number" left="New Min Squad Size:" onInputChange={handleMinSizeInput}/>
                <TextRow left="Current Max. Size:" right={originalSquad.MaxSize}/>
                <InputRow type="number" left="New Max Squad Size:" onInputChange={handleMaxSizeInput}/>
                <SelectArray
                    codexArray={codexUnits}
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