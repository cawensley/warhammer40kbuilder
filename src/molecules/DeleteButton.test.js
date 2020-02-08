import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr,checkProp} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DeleteButton from "./DeleteButton";
import firebase from "firebase/app";
import {firestore} from "../utilities/mockFirestore";

firebase.firestore = firestore;
Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props) => {
    return shallow(<DeleteButton {...props}/>)
};

test('Delete Button renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'deleteButton');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props',()=>{
    const expectedProps = {uniqueID:"IamHuman"};
    checkProp(DeleteButton,expectedProps);
});

test('Delete button click calls RemoveItem function',()=>{
    const wrapper = setup({collectionName: "books",uniqueID: "JiminyCrickett"});
    const deleteButton=findByTestAttr(wrapper,'deleteButton');
    deleteButton.simulate('click',{preventDefault () {}});
    expect(firestore().collection).toHaveBeenCalledWith("books");
    expect(firestore().collection().doc).toHaveBeenCalledWith("JiminyCrickett");
});


