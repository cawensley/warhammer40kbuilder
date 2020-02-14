export default function equipment(state = [], action) {
  if (action.type === 'Equipment_Change') {
    return action.payload;
  }
  return state;
}
