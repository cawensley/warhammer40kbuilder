export default function codices(state = [{id: "99999",Name:"loading..."}], action) {
    if (action.type === 'Codices_Change') {
        return action.payload;
    }
    return state;
}