import store from '../Redux/store';

function codexFilter(array) {
  const filteredArray = array.filter((item) => (item.Codex === store.getState().codex));
  return filteredArray;
}

export default codexFilter;
