import firebase from "firebase/app";
import {firestore} from "../utilities/mockFirestore";
import GetInitialData from "./GetInitialData";

firebase.firestore = firestore;

test('GetInitialData grabs five collections ',()=>{
    GetInitialData();
    expect(firestore().collection).toHaveBeenCalledWith("codices");
    expect(firestore().collection).toHaveBeenCalledWith("Roles");
    expect(firestore().collection).toHaveBeenCalledWith("equipment");
    expect(firestore().collection).toHaveBeenCalledWith("units");
    expect(firestore().collection).toHaveBeenCalledWith("squads");
});