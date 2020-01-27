import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import TextRow from "../../atoms/TextRow";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../atoms/SelectArray";
import DisplayArray from "../../atoms/DisplayArray";
import RoleRow from "../../atoms/RoleRow";
import FirebaseContext from "../../firebase/FirebaseContext";

function EditSquadsPage ({match}) {
    const {codex,role}=useContext(FirebaseContext);
    const editSquadID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [originalName,setOriginalName]=useState(null);
    const [originalRole,setOriginalRole]=useState(null);
    const [originalMinSize,setOriginalMinSize]=useState(null);
    const [originalMaxSize,setOriginalMaxSize]=useState(null);
    const [newSquadName,setNewSquadName] = useState(null);
    const [newSquadMinSize,setNewSquadMinSize] = useState(null);
    const [newSquadMaxSize,setNewSquadMaxSize] = useState(null);
    const [newSquadUnits,setNewSquadUnits] = useState([]);
    const [refresh,setRefresh] = useState(false);

    function handleNameInput(input) {setNewSquadName(input)}
    function handleMinSizeInput(input) {setNewSquadMinSize(input)}
    function handleMaxSizeInput(input) {setNewSquadMaxSize(input)}
    function handleUnitRemove () {var NewUnit = newSquadUnits;NewUnit.pop();setNewSquadUnits(NewUnit);setRefresh(!refresh)}
    function handleUnitAdd(input) {var NewUnit = newSquadUnits;NewUnit.push(input);setNewSquadUnits(NewUnit);setRefresh(!refresh)}

    function getEditSquadInfo () {
        setisLoading(true);
        firebase.db.collection("squads").doc(editSquadID).get()
            .then(doc=>{
                setOriginalName(doc.data().Name);
                setOriginalRole(doc.data().Role);
                setOriginalMinSize(doc.data().MinSize);
                setOriginalMaxSize(doc.data().MaxSize);
                setNewSquadName(doc.data().Name);
                setNewSquadMinSize(doc.data().MinSize);
                setNewSquadMaxSize(doc.data().MaxSize);
                setNewSquadUnits(doc.data().Units);
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditSquadInfo()},[]);

    function handleEditSquadSubmission () {
        const EditSquad = {
            Codex: codex,
            Name: newSquadName,
            Role: role,
            MinSize: newSquadMinSize,
            MaxSize: newSquadMaxSize,
            Units: newSquadUnits
        };
        firebase.db.collection("squads").doc(editSquadID).set(EditSquad);
        window.location.hash = '/squads/view';
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Squads Page" />
            <form onSubmit={handleEditSquadSubmission}>
                <CodexFilter/>
                <TextRow left="Current Name:" right={originalName}/>
                <InputRow type="text" left="New Squad Name:" onInputChange={handleNameInput}/>
                <TextRow left="Current Role:" right={originalRole}/>
                <RoleRow left="New Army Role:"/>
                <TextRow left="Current Min. Size:" right={originalMinSize}/>
                <InputRow type="number" left="New Min Squad Size:" onInputChange={handleMinSizeInput}/>
                <TextRow left="Current Max. Size:" right={originalMaxSize}/>
                <InputRow type="number" left="New Max Squad Size:" onInputChange={handleMaxSizeInput}/>
                <SelectArray collectionName="units" left="Units in Squad:" onItemAdd={handleUnitAdd} onItemRemove={handleUnitRemove}/>
                <DisplayArray left="Units Added:" array={newSquadUnits}/>
                <SubmitButton buttontext="Save Changes to Squad"/>
            </form>
        </div>
    )
}

export default EditSquadsPage;