import store from "../store";
import CodicesChange from "./CodicesChange";

test("Redux Action CodicesChange is successful in redux state change",()=>{
   store.dispatch(CodicesChange(["Ninjas","Pirates"]));
   const CodicesState = store.getState().codices;
   expect(CodicesState).toEqual(["Ninjas","Pirates"])
});