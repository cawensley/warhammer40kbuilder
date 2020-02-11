import React from 'react';
import Enzyme,{mount} from 'enzyme';
import {findByTestAttr} from "../../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from "firebase/app";
import {firestore} from "../../utilities/mockFirestore";
import EditEquipmentPage from "./EditEquipmentPage";

firebase.firestore = firestore;
Enzyme.configure({adapter:new EnzymeAdapter()});

let mockSetState = jest.fn();

const setup = (isLoading) => {
    const mockEquipment = {Codex: "Pirates",Name: "PirateSword",Cost:99};
    jest.clearAllMocks();
    React.useState=jest.fn(()=>[{isLoading:isLoading,Equipment:mockEquipment},mockSetState]);
    return mount(<EditEquipmentPage match={{params:{ID:"3333"}}}/>)
};

test('Edit Equipment Page renders without error',()=>{
    const wrapper = setup(false);
    const component = findByTestAttr(wrapper,'editEquipmentPage');
    expect(component.length).toBe(1);
});
test('Edit Equipment Page doesnt render when Loading',()=>{
    const wrapper = setup(true);
    const component = findByTestAttr(wrapper,'editEquipmentPage');
    expect(component.length).toBe(0);
});
test('Edit Equipment submit button click calls SET function',()=>{
    const wrapper = setup(false);
    const submitButton=findByTestAttr(wrapper,'submitButton');
    submitButton.simulate('submit',{preventDefault () {}});
    expect(firestore().collection).toHaveBeenCalledWith("equipment");
    expect(firestore().collection().doc).toHaveBeenCalledWith("3333");
    expect(firestore().collection().doc().set).toHaveBeenCalledWith({Codex: "Pirates",Name: "PirateSword",Cost:99})
});
test('Edit Equipment handleNameInput function works properly',()=>{
    const wrapper = setup(false);
    const inputBox=findByTestAttr(wrapper,'input-box').at(0);
    inputBox.simulate("change",{target: {value:'CoolSword88'}});
    expect(mockSetState).toHaveBeenCalledWith({isLoading:false,Equipment:{Codex: "Pirates",Name: "CoolSword88",Cost:99}});
});
test('Edit Equipment handleCostInput function works properly',()=>{
    const wrapper = setup(false);
    const inputBox=findByTestAttr(wrapper,'input-box').at(1);
    inputBox.simulate("change",{target: {value:70}});
    expect(mockSetState).toHaveBeenCalledWith({isLoading:false,Equipment:{Codex: "Pirates",Name: "PirateSword",Cost:70}});
});
