import store from "../store";
import LoginChange from "./LoginChange";

test("Redux Action LoginChange is successful in redux state change",()=>{
   store.dispatch(LoginChange(true));
   const LoginState = store.getState().isLoggedIn;
   expect(LoginState).toEqual(true)
});