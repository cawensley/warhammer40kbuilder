import React, {useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import TextRow from "../../atoms/TextRow";
import InputRow from "../../atoms/InputRow";

function EditEquipmentPage ({match}) {
    const editEquipmentID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [originalName,setOriginalName]=useState(null);
    const [originalCost,setOriginalCost]=useState(null);

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("equipment").doc(editEquipmentID).get()
            .then(doc=>{
                setOriginalName(doc.data().Name);
                setOriginalCost(doc.data().Cost);
                localStorage.setItem("Name",doc.data().Name);
                localStorage.setItem("Cost",doc.data().Cost)
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditItemInfo()},[]);

    function handleEditItemSubmission () {
        const EditItem = {
            Codex: store.getState().codexSelection,
            Name: localStorage.getItem("Name"),
            Cost: JSON.parse(localStorage.getItem("Cost"))
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
                <InputRow left="New Name:" right="Name" type="text"/>
                <TextRow left="Current Cost:" right={originalCost}/>
                <InputRow left="New Cost:" right="Cost" type="number"/>
                <SubmitButton buttontext={"Save Changes to Equipment"}/>
            </form>
        </div>
    )
}

export default EditEquipmentPage;