export default function units(state = [], action) {
  if (action.type === 'Units_Change') {
    return action.payload;
  }
  return state;
}
