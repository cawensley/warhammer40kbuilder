import store from "../store";
import RoleChange from "./RoleChange";

test("Redux Action RoleChange is successful in redux state change",()=>{
   store.dispatch(RoleChange(["FirstPenguin"]));
   const RoleState = store.getState().role;
   expect(RoleState).toEqual(["FirstPenguin"])
});