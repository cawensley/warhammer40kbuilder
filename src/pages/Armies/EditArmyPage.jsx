import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import PageTitle from '../../atoms/PageTitle';
import store from '../../Redux/store';
import PageLoading from '../../atoms/PageLoading';
import { ArmyNameChange, CodexChange } from '../../Redux/actions/index';
import ArmySquadChange from '../../Redux/actions/ArmySquadChange/ArmySquadChange';
import TextInputRow from '../../atoms/TextInputRow';
import PointsRow from '../../atoms/PointsRow';
import SubmitButton from '../../atoms/SubmitButton';
import SquadRow from '../../organisms/SquadRow';
import 'firebase/firestore';

const EditArmyPage = ({ match }) => {
  const editArmyID = match.params.ID;
  const [isLoading, setisLoading] = React.useState(false);

  function handleNameInput(input) { store.dispatch(ArmyNameChange(input)); }

  function getEditArmyInfo() {
    setisLoading(true);
    firebase.firestore()
      .collection('armies')
      .doc(editArmyID)
      .get()
      .then((doc) => {
        if (store.getState().user.uid !== doc.data().userID) { window.location = '/'; }
        store.dispatch(ArmySquadChange(doc.data().SquadArray));
        store.dispatch(ArmyNameChange(doc.data().Name));
        for (let i = 0; i < doc.data().SquadArray.length; i += 1) {
          if (doc.data().SquadArray[i].Squads.length > 0) {
            const firstSquad = doc.data().SquadArray[i].Squads[0].Squad;
            const armyCodex = store.getState().squads
              .filter((squad) => squad.id === firstSquad)[0].Codex;
            store.dispatch(CodexChange(armyCodex));
            break;
          }
        }
      });
    setisLoading(false);
  }

  function handleArmySubmission() {
    firebase.firestore().collection('armies').doc(editArmyID).set({
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

  // eslint-disable-next-line
  React.useEffect(() => { getEditArmyInfo(); }, []);

  if (isLoading) { return <PageLoading />; }

  return (
    <div data-test="EditArmyPage" className="container p-padding text-center">
      <PageTitle Title="Edit Army Page" />
      <form data-test="submitButton" onSubmit={() => handleArmySubmission()}>
        <TextInputRow type="text" left="Army Name:" startValue={store.getState().army.Name} onInputChange={handleNameInput} />
        <PointsRow />
        <SubmitButton buttontext="Save Changes to Army" />
        {store.getState().army.SquadArray.map(
          (row, index) => <SquadRow key={uuidv4()} roleIndex={index} />,
        )}
        <SubmitButton buttontext="Save Changes to Army" />
      </form>
    </div>
  );
};

EditArmyPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      ID: PropTypes.string,
    }),
  }),
};

EditArmyPage.defaultProps = {
  match: null,
};

export default EditArmyPage;
