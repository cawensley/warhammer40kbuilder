import React, {useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import TextRow from "../../atoms/TextRow";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../atoms/SelectArray";
import DisplayArray from "../../atoms/DisplayArray";

function EditUnitsPage ({match}) {
    const editUnitID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [originalName,setOriginalName]=useState(null);
    const [originalCost,setOriginalCost]=useState(null);
    const [newUnitName,setNewUnitName] = useState(null);
    const [newUnitCost,setNewUnitCost] = useState(null);
    const [newUnitGear,setNewUnitGear] = useState([]);
    const [refresh,setRefresh] = useState(false);

    function handleNameInput(input) {setNewUnitName(input)}
    function handleCostInput(input) {setNewUnitCost(input)}
    function handleGearRemove () {var NewGear = newUnitGear;NewGear.pop();setNewUnitGear(NewGear);setRefresh(!refresh)}
    function handleGearAdd(input) {var NewGear = newUnitGear;NewGear.push(input);setNewUnitGear(NewGear);setRefresh(!refresh)}

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("units").doc(editUnitID).get()
            .then(doc=>{
                setOriginalName(doc.data().Name);
                setOriginalCost(doc.data().Cost);
                setNewUnitName(doc.data().Name);
                setNewUnitCost(doc.data().Cost);
                setNewUnitGear(doc.data().Gear);
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditItemInfo()},[]);

    function handleEditUnitSubmission () {
        const EditUnit = {
            Codex: store.getState().codexSelection,
            Name: newUnitName,
            Cost: newUnitCost,
            Gear: newUnitGear
        };
        firebase.db.collection("units").doc(editUnitID).set(EditUnit);
        window.location.hash = '/units/view';
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Units Page" />
            <form onSubmit={handleEditUnitSubmission}>
                <CodexFilter/>
                <TextRow left="Current Name:" right={originalName}/>
                <InputRow type="text" left="New Unit Name:" onInputChange={handleNameInput}/>
                <TextRow left="Current Cost:" right={originalCost}/>
                <InputRow type="number" left="New Unit Cost:" onInputChange={handleCostInput}/>
                <SelectArray collectionName="equipment" left="Unit Gear:" onItemAdd={handleGearAdd} onItemRemove={handleGearRemove}/>
                <DisplayArray collectionName="equipment" left="Gear Selected:" array={newUnitGear}/>
                <SubmitButton buttontext={"Save Changes to Unit"}/>
            </form>
        </div>
    )
}

export default EditUnitsPage;