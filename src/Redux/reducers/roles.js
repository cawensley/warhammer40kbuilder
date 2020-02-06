export default function roles(state = [], action) {
    if (action.type === 'Roles_Change') {
        return action.payload;
    }
    return state;
}