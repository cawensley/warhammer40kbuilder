import React from 'react';
import Enzyme , {mount} from 'enzyme';
import {findByTestAttr} from "../../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NewEquipmentPage from "./NewEquipmentPage";
import firebase from "firebase/app";
import {firestore} from "../../utilities/mockFirestore";

firebase.firestore = firestore;
Enzyme.configure({adapter:new EnzymeAdapter()});

let mocksetNewEquipment = jest.fn();

const setup = () => {
    mocksetNewEquipment.mockClear();
    React.useState=jest.fn(()=>["",mocksetNewEquipment]);
    return mount(<NewEquipmentPage/>)
};

test('New Equipment Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'newEquipmentPage');
    expect(component.length).toBe(1);
});
test('New Equipment submit button click calls Add function',()=>{
    const wrapper = setup();
    const submitButton=findByTestAttr(wrapper,'submitButton');
    submitButton.simulate('submit',{preventDefault () {}});
    expect(firestore().collection).toHaveBeenCalledWith("equipment");
});
test('New Equipment handleNameInput function works properly',()=>{
    const wrapper = setup();
    const inputNameBox=findByTestAttr(wrapper,'input-box').at(0);
    inputNameBox.simulate("change",{target: {value:'Benny'}});
    expect(mocksetNewEquipment).toHaveBeenCalledWith({Name:"Benny"});
});
test('New Equipment handleCostInput function works properly',()=>{
    const wrapper = setup();
    const inputCostBox=findByTestAttr(wrapper,'input-box').at(1);
    inputCostBox.simulate("change",{target: {value:'2'}});
    expect(mocksetNewEquipment).toHaveBeenCalledWith({Cost: 2})
});