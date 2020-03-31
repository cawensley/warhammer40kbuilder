// eslint-disable-next-line
import Enzyme, { shallow, mount } from 'enzyme';
// eslint-disable-next-line
import EnzymeAdapter from 'enzyme-adapter-react-16';
import checkPropTypes from 'check-prop-types';
import firebase from 'firebase/app';
import auth from './mockAuth';
import firestore from './mockFirestore';
import firebaseConfig from '../firebase/config';

firebase.initializeApp(firebaseConfig);

Enzyme.configure({ adapter: new EnzymeAdapter() });

const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test="${value}"]`);

const checkProp = (component, conformingProps) => {
  const propError = checkPropTypes(
    /* eslint-disable react/forbid-foreign-prop-types */
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
};

export {
  auth, firestore, findByTestAttr, checkProp, shallow, mount,
};
