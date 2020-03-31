export default function userArmies(state = [], action) {
  if (action.type === 'userArmies_Change') {
    return action.payload;
  }
  return state;
}
