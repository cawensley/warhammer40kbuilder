export default function armyPoints(state = 0, action) {
  if (action.type === 'Army_Points_Change') {
    return action.payload;
  }
  return state;
}
