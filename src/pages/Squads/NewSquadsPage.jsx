import React from 'react';
import firebase from 'firebase/app';
import PageTitle from '../../atoms/PageTitle';
import 'firebase/firestore';
import CodexFilter from '../../molecules/CodexFilter';
import SubmitButton from '../../atoms/SubmitButton';
import TextInputRow from '../../atoms/TextInputRow';
import SelectArray from '../../molecules/SelectArray';
import RoleRow from '../../molecules/RoleRow';
import store from '../../Redux/store';
import codexFilter from '../../utilities/codexFilter';
import NumberInputRow from '../../atoms/NumberInputRow';

const NewSquadsPage = () => {
  const [newSquad, setNewSquad] = React.useState({
    Codex: store.getState().codex, Name: '', Role: store.getState().role, MinSize: 0, MaxSize: 0, Units: [],
  });

  function handleNameInput(input) { setNewSquad({ ...newSquad, Name: input }); }
  function handleMinSizeInput(input) { setNewSquad({ ...newSquad, MinSize: +input }); }
  function handleMaxSizeInput(input) { setNewSquad({ ...newSquad, MaxSize: +input }); }
  function handleUnitRemove() {
    const NewUnit = newSquad.Units;
    NewUnit.pop();
    setNewSquad({ ...newSquad, Units: NewUnit });
  }
  function handleUnitAdd(input) {
    const NewUnit = newSquad.Units;
    NewUnit.push(input);
    setNewSquad({ ...newSquad, Units: NewUnit });
  }

  function handleNewSquadSubmission() {
    firebase.firestore().collection('squads').add(newSquad);
    window.location = '/squads/view';
  }

  // eslint-disable-next-line
    React.useEffect(()=>setNewSquad({...newSquad,Codex:store.getState().codex}),[store.getState().codex]);
  // eslint-disable-next-line
    React.useEffect(()=>setNewSquad({...newSquad,Role:store.getState().role}),[store.getState().role]);

  return (
    <div data-test="newSquadsPage" className="container-fluid p-padding text-center">
      <PageTitle Title="New Squads Page" />
      <form data-test="submitButton" onSubmit={handleNewSquadSubmission}>
        <CodexFilter />
        <TextInputRow type="text" left="New Squad Name:" startValue={newSquad.Name} onInputChange={handleNameInput} />
        <RoleRow left="Army Role:" />
        <NumberInputRow left="Min Squad Size:" startValue={newSquad.MinSize} onInputChange={handleMinSizeInput} />
        <NumberInputRow left="Max Squad Size:" startValue={newSquad.MaxSize} onInputChange={handleMaxSizeInput} />
        <SelectArray
          codexArray={codexFilter(store.getState().units)}
          left="Units in Squad:"
          onItemAdd={handleUnitAdd}
          onItemRemove={handleUnitRemove}
          arrayDisplay={newSquad.Units}
        />
        <SubmitButton buttontext="Add Squad to Database" />
      </form>
    </div>
  );
};

export default NewSquadsPage;
