export default function LoginChange(LoginStatus) {
    localStorage.setItem('LoginStatus',LoginStatus);
    return { type: 'Login_Change', payload: LoginStatus };
}