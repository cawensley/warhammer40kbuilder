export default function role(state = 'g5ffh3LG3s8zZqUZKw9y', action) {
  if (action.type === 'Role_Change') {
    return action.payload;
  }
  return state;
}
