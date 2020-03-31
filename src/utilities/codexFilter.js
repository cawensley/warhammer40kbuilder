import store from '../Redux/store';

function codexFilter(array) {
  return array.filter((item) => (item.Codex === store.getState().codex));
}

export default codexFilter;
