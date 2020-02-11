import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import firebase from "firebase/app";
import "firebase/firestore";
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
    const [state, setState] = React.useState({isLoading:false,Squad:{Codex: store.getState().codex,Name: '',Role: store.getState().role,MinSize: '',MaxSize: '',Units: []}});

    function handleNameInput(input) {setState({...state,Squad:{...state.Squad,Name:input}})}
    function handleMinSizeInput(input) {setState({...state,Squad:{...state.Squad,MinSize:input}})}
    function handleMaxSizeInput(input) {setState({...state,Squad:{...state.Squad,MaxSize:input}})}
    function handleUnitRemove () {var NewUnits = state.Squad.Units;NewUnits.pop();setState({...state,Squad:{...state.Squad,Units:NewUnits}})}
    function handleUnitAdd(input) {var NewUnits = state.Squad.Units;NewUnits.push(input);setState({...state,Squad:{...state.Squad,Units:NewUnits}})}

    function getEditSquadInfo () {
        setState({...state,isLoading:true});
        firebase.firestore().collection("squads").doc(editSquadID).get()
            .then(doc=>{
                setState({...state,Squad:{...state.Squad,
                    Name: doc.data().Name,
                    MinSize: doc.data().MinSize,
                    MaxSize:doc.data().MaxSize,
                    Units:doc.data().Units
                }});
                store.dispatch(RoleChange(doc.data().Role))
            });
        setState({...state,isLoading:false});
    }

    // eslint-disable-next-line
    React.useEffect(()=>{getEditSquadInfo()},[]);
    // eslint-disable-next-line
    React.useEffect(()=>setState({...state,Squad:{...state.Squad,Codex:store.getState().codex}}),[store.getState().codex]);
    // eslint-disable-next-line
    React.useEffect(()=>setState({...state,Squad:{...state.Squad,Role:store.getState().role}}),[store.getState().role]);

    function handleEditSquadSubmission () {
        firebase.firestore().collection("squads").doc(editSquadID).set(state.Squad);
        window.location.hash = '/squads/view';
    }

    if (state.isLoading) { return (<PageLoading />); }

    return (
        <div data-test="editSquadsPage" className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Squads Page" />
            <form data-test="submitButton" onSubmit={handleEditSquadSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="Edit Squad Name:" startValue={state.Squad.Name} onInputChange={handleNameInput}/>
                <RoleRow left="Edit Army Role:"/>
                <InputRow type="number" left="Edit Min Squad Size:" startValue={state.Squad.MinSize} onInputChange={handleMinSizeInput}/>
                <InputRow type="number" left="Edit Max Squad Size:" startValue={state.Squad.MaxSize} onInputChange={handleMaxSizeInput}/>
                <SelectArray
                    codexArray={codexFilter(store.getState().units)}
                    left="Units in Squad:"
                    onItemAdd={handleUnitAdd}
                    onItemRemove={handleUnitRemove}
                    arrayDisplay={state.Squad.Units}
                />
                <SubmitButton buttontext="Save Changes to Squad"/>
            </form>
        </div>
    )
}

export default EditSquadsPage;