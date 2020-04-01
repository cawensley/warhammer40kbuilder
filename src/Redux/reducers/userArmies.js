export default function userArmies(state = [], action) {
  if (action.type === 'User_Armies_Change') {
    return action.payload;
  }
  return state;
}
