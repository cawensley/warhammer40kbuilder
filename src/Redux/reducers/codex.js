export default function codex(state = '75354kSpFNsaDqTqIT6i', action) {
  if (action.type === 'Codex_Change') {
    return action.payload;
  }
  return state;
}
