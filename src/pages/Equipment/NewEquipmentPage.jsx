import React from 'react';
import firebase from 'firebase/app';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import SubmitButton from '../../atoms/SubmitButton';
import TextInputRow from '../../atoms/TextInputRow';
import store from '../../Redux/store';
import 'firebase/firestore';
import NumberInputRow from '../../atoms/NumberInputRow';

const NewEquipmentPage = () => {
  const [newEquipment, setNewEquipment] = React.useState({ Codex: store.getState().codex, Name: '', Cost: 0 });

  function handleNameInput(input) { setNewEquipment({ ...newEquipment, Name: input }); }
  function handleCostInput(input) { setNewEquipment({ ...newEquipment, Cost: +input }); }

  // eslint-disable-next-line
    React.useEffect(()=>setNewEquipment({...newEquipment,Codex:store.getState().codex}),[store.getState().codex]);

  function newEquipmentSubmission() {
    firebase.firestore().collection('equipment').add(newEquipment);
    window.location.hash = '/equipment/view';
  }

  return (
    <div data-test="newEquipmentPage" className="container-fluid p-padding text-center">
      <PageTitle Title="New Equipment Page" />
      <form data-test="submitButton" onSubmit={newEquipmentSubmission}>
        <CodexFilter />
        <TextInputRow type="text" left="New Equipment Name:" startValue={newEquipment.Name} onInputChange={handleNameInput} />
        <NumberInputRow left="New Equipment Cost:" startValue={newEquipment.Cost} onInputChange={handleCostInput} />
        <SubmitButton buttontext="Add Equipment to Database" />
      </form>
    </div>
  );
};

export default NewEquipmentPage;
