export default function isLoggedIn(state = false, action) {
    if (action.type === 'Login_Change') {
        return action.payload;
    }
    return state;
}