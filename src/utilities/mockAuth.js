import store from '../Redux/store';

const signOut = jest.fn();
const sendPasswordResetEmail = jest.fn((email) => new Promise((resolve, reject) => {
  if (email === 'bobby@gmail.com') { resolve(true); } reject(Error('Email doesnt exist'));
}));
const signInWithEmailAndPassword = jest.fn((email, password) => new Promise((resolve, reject) => {
  if (password === 'success') { resolve(true); } reject(Error('password is incorrect'));
}));
const createUserWithEmailAndPassword = jest.fn((email, password) => new Promise(
  (resolve, reject) => {
    if (password === 'success') { resolve(true); } reject(Error('password is invalid'));
  },
));
const updateProfile = jest.fn(({ displayName: name }) => new Promise((resolve, reject) => {
  if (name === 'success') { resolve(true); } reject(Error('Name is invalid'));
}));
const updateEmail = jest.fn((email) => new Promise((resolve, reject) => {
  if (email === 'success') { resolve(true); } reject(Error('Email is invalid'));
}));
const updatePassword = jest.fn((password) => new Promise((resolve, reject) => {
  if (password === 'success') { resolve(true); } reject(Error('Password is incorrect'));
}));
const mockUser = { uid: '1111', displayName: 'Jimbob', email: 'Jimbob@gmail.com' };
const onAuthStateChanged = jest.fn((success) => (
  (store.getState().user) ? success(mockUser) : success(null)
));

const auth = () => ({
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  currentUser: {
    updateProfile,
    updateEmail,
    updatePassword,
  },
});

export default auth;
