import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import TextRow from "../../atoms/TextRow";
import InputRow from "../../atoms/InputRow";
import FirebaseContext from "../../firebase/FirebaseContext";

function EditEquipmentPage ({match}) {
    const {codex}=useContext(FirebaseContext);
    const editEquipmentID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [originalName,setOriginalName]=useState(null);
    const [originalCost,setOriginalCost]=useState(null);
    const [newEquipmentName,setNewEquipmentName] = useState(null);
    const [newEquipmentCost,setNewEquipmentCost] = useState(null);

    function handleNameInput(input) {setNewEquipmentName(input)}
    function handleCostInput(input) {setNewEquipmentCost(input)}

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("equipment").doc(editEquipmentID).get()
            .then(doc=>{
                setOriginalName(doc.data().Name);
                setOriginalCost(doc.data().Cost);
                setNewEquipmentName(doc.data().Name);
                setNewEquipmentCost(doc.data().Cost)
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditItemInfo()},[]);

    function handleEditItemSubmission () {
        const EditItem = {
            Codex: codex,
            Name: newEquipmentName,
            Cost: newEquipmentCost
        };
        firebase.db.collection("equipment").doc(editEquipmentID).set(EditItem);
        window.location.hash = '/equipment/view';
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Equipment Page" />
            <form onSubmit={handleEditItemSubmission}>
                <CodexFilter/>
                <TextRow left="Current Name:" right={originalName}/>
                <InputRow type="text" left="New Equipment Name:" onInputChange={handleNameInput}/>
                <TextRow left="Current Cost:" right={originalCost}/>
                <InputRow type="number" left="New Equipment Cost:" onInputChange={handleCostInput}/>
                <SubmitButton buttontext={"Save Changes to Equipment"}/>
            </form>
        </div>
    )
}

export default EditEquipmentPage;