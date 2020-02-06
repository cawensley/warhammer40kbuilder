export default function codices(state = [], action) {
    if (action.type === 'Codices_Change') {
        return action.payload;
    }
    return state;
}