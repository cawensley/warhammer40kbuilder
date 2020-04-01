import React from 'react';
import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import TextInputRow from '../../atoms/TextInputRow';
import PointsRow from '../../atoms/PointsRow';
import SquadRow from '../../organisms/SquadRow';
import store from '../../Redux/store';
import ArmyNameChange from '../../Redux/actions/ArmyNameChange/ArmyNameChange';
import SubmitButton from '../../atoms/SubmitButton';
import handleInitialArmy from '../../utilities/handleInitialArmy';

const NewArmyPage = () => {
  function handleNameInput(input) { store.dispatch(ArmyNameChange(input)); }

  function handleArmySubmission() {
    firebase.firestore().collection('armies').add({
      userID: store.getState().user.uid,
      Name: store.getState().army.Name,
      Points: store.getState().armyPoints,
      Date: {
        Day: new Date().getDate(),
        Month: new Date().getMonth(),
        Year: new Date().getFullYear(),
      },
      exactDate: new Date(),
      SquadArray: store.getState().army.SquadArray,
    });
    window.location.hash = '/armies/view';
  }

  React.useEffect(() => { handleInitialArmy(); }, []);

  return (
    <div data-test="NewArmyPage" className="container-fluid p-padding text-center">
      <PageTitle Title="New Armies Page" />
      <form data-test="submitButton" onSubmit={() => handleArmySubmission()}>
        <CodexFilter />
        <TextInputRow type="text" left="Army Name:" startValue={store.getState().army.Name} onInputChange={handleNameInput} />
        <PointsRow />
        <SubmitButton buttontext="Add Army to Profile" />
        {store.getState().army.SquadArray.map(
          (row, index) => <SquadRow key={uuidv4()} roleIndex={index} />,
        )}
        <SubmitButton buttontext="Add Army to Profile" />
      </form>
    </div>
  );
};

export default NewArmyPage;
