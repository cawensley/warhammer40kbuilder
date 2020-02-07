import store from "../store";
import UnitsChange from "./UnitsChange";

test("Redux Action UnitsChange is successful in redux state change",()=>{
   store.dispatch(UnitsChange(["Ninjas","Pirates"]));
   const UnitsState = store.getState().units;
   expect(UnitsState).toEqual(["Ninjas","Pirates"])
});