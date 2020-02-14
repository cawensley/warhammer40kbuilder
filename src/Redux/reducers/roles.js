export default function roles(state = [{ id: '99999', Name: 'loading...' }], action) {
  if (action.type === 'Roles_Change') {
    return action.payload;
  }
  return state;
}
