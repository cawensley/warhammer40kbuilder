export default function squads(state = [], action) {
    if (action.type === 'Squads_Change') {
        return action.payload;
    }
    return state;
}