export default function user(state = null, action) {
  if (action.type === 'User_Change') {
    return action.payload;
  }
  return state;
}
