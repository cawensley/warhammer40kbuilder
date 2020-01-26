export default function loginstatus(state = false, action) {
    if (action.type === 'Login_Change') {
        return action.payload;
    }
    return state;
}