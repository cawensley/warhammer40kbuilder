export default function loginstatus(state = JSON.parse(localStorage.getItem('LoginStatus')) || false, action) {
    if (action.type === 'Login_Change') {
        return action.payload;
    }
    return state;
}