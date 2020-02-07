import store from "../store";
import RolesChange from "./RolesChange";

test("Redux Action RoleChange is successful in redux state change",()=>{
   store.dispatch(RolesChange(["FirstPenguin","SecondPenguin"]));
   const RolesState = store.getState().roles;
   expect(RolesState).toEqual(["FirstPenguin","SecondPenguin"])
});