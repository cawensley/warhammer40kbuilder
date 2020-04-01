export default function homeArmies(state = [], action) {
  if (action.type === 'Home_Armies_Change') {
    return action.payload;
  }
  return state;
}
