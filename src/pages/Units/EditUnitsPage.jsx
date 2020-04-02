import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import 'firebase/firestore';
import PageLoading from '../../atoms/PageLoading';
import SubmitButton from '../../atoms/SubmitButton';
import TextInputRow from '../../atoms/TextInputRow';
import SelectArray from '../../molecules/SelectArray';
import store from '../../Redux/store';
import codexFilter from '../../utilities/codexFilter';
import NumberInputRow from '../../atoms/NumberInputRow';

const EditUnitsPage = ({ match }) => {
  const editUnitID = match.params.ID;
  const [state, setState] = React.useState({
    isLoading: false,
    Unit: {
      Codex: store.getState().codex, Name: '', Cost: 0, Abilities: '', Gear: [],
    },
  });

  function handleNameInput(input) { setState({ ...state, Unit: { ...state.Unit, Name: input } }); }
  function handleCostInput(input) { setState({ ...state, Unit: { ...state.Unit, Cost: +input } }); }
  function handleAbilitiesInput(input) {
    setState({ ...state, Unit: { ...state.Unit, Abilities: input } });
  }
  function handleGearRemove() {
    const NewGear = state.Unit.Gear;
    NewGear.pop();
    setState({ ...state, Unit: { ...state.Unit, Gear: NewGear } });
  }
  function handleGearAdd(input) {
    const NewGear = state.Unit.Gear;
    NewGear.push(input);
    setState({ ...state, Unit: { ...state.Unit, Gear: NewGear } });
  }

  function getEditItemInfo() {
    setState({ ...state, isLoading: true });
    firebase.firestore().collection('units').doc(editUnitID).get()
      .then((doc) => {
        setState({
          ...state,
          Unit: {
            ...state.Unit,
            Name: doc.data().Name,
            Cost: doc.data().Cost,
            Abilities: doc.data().Abilities,
            Gear: doc.data().Gear,
          },
        });
      });
    setState({ ...state, isLoading: false });
  }

  // eslint-disable-next-line
    React.useEffect(()=>{getEditItemInfo()},[]);
  // eslint-disable-next-line
    React.useEffect(()=>setState({...state,Unit:{...state.Unit,Codex:store.getState().codex}}),[store.getState().codex]);

  function handleEditUnitSubmission() {
    firebase.firestore().collection('units').doc(editUnitID).set(state.Unit);
    window.location = '/units/view';
  }

  if (state.isLoading) { return (<PageLoading />); }

  return (
    <div data-test="editUnitsPage" className="container-fluid p-padding text-center">
      <PageTitle Title="Edit Units Page" />
      <form data-test="submitButton" onSubmit={handleEditUnitSubmission}>
        <CodexFilter />
        <TextInputRow type="text" left="Edit Unit Name:" startValue={state.Unit.Name} onInputChange={handleNameInput} />
        <NumberInputRow left="Edit Unit Cost:" startValue={state.Unit.Cost} onInputChange={handleCostInput} />
        <TextInputRow type="text" left="Edit Unit Abilities:" startValue={state.Unit.Abilities} onInputChange={handleAbilitiesInput} />
        <SelectArray
          codexArray={codexFilter(store.getState().equipment)}
          left="Gear:"
          onItemAdd={handleGearAdd}
          onItemRemove={handleGearRemove}
          arrayDisplay={state.Unit.Gear}
        />
        <SubmitButton buttontext="Save Changes to Unit" />
      </form>
    </div>
  );
};

EditUnitsPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      ID: PropTypes.string,
    }),
  }),
};

EditUnitsPage.defaultProps = {
  match: null,
};

export default EditUnitsPage;
