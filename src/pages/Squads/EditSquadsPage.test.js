import React from 'react';
import Enzyme,{mount} from 'enzyme';
import {findByTestAttr} from "../../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from "firebase/app";
import {firestore} from "../../utilities/mockFirestore";
import EditSquadsPage from "./EditSquadsPage";

firebase.firestore = firestore;
Enzyme.configure({adapter:new EnzymeAdapter()});

let mockSetState = jest.fn();
const mockSquad = {Codex: "Autobots",Name: '',Role: "GoodGuys",MinSize: '',MaxSize: '',Units: ["Barricade"]};

const setup = (isLoading) => {
    jest.clearAllMocks();
    React.useState=jest.fn(()=>[{isLoading:isLoading,Squad:mockSquad},mockSetState]);
    return mount(<EditSquadsPage match={{params:{ID:"5555"}}}/>)
};

test('Edit Squads Page renders without error',()=>{
    const wrapper = setup(false);
    const component = findByTestAttr(wrapper,'editSquadsPage');
    expect(component.length).toBe(1);
});
test('Edit Squads Page doesnt render when Loading',()=>{
    const wrapper = setup(true);
    const component = findByTestAttr(wrapper,'editSquadsPage');
    expect(component.length).toBe(0);
});
test('Edit Squads submit button click calls SET function',()=>{
    const wrapper = setup(false);
    const submitButton=findByTestAttr(wrapper,'submitButton');
    submitButton.simulate('submit',{preventDefault () {}});
    expect(firestore().collection).toHaveBeenCalledWith("squads");
    expect(firestore().collection().doc).toHaveBeenCalledWith("5555");
    expect(firestore().collection().doc().set).toHaveBeenCalledWith({Codex: "Autobots",Name: '',Role: "GoodGuys",MinSize: '',MaxSize: '',Units: ["Barricade"]})
});
test('Edit Squads handleNameInput function works properly',()=>{
    const wrapper = setup(false);
    const inputBox=findByTestAttr(wrapper,'input-box').at(0);
    inputBox.simulate("change",{target: {value:'Megatron'}});
    expect(mockSetState).toHaveBeenCalledWith({isLoading:false,Squad:{Codex: "Autobots",Name: 'Megatron',Role: "GoodGuys",MinSize: '',MaxSize: '',Units: ["Barricade"]}});
});
test('Edit Squads handleMinSizeInput function works properly',()=>{
    const wrapper = setup(false);
    const inputBox=findByTestAttr(wrapper,'input-box').at(1);
    inputBox.simulate("change",{target: {value:5}});
    expect(mockSetState).toHaveBeenCalledWith({isLoading:false,Squad:{Codex: "Autobots",Name: '',Role: "GoodGuys",MinSize: 5,MaxSize: '',Units: ["Barricade"]}});
});
test('Edit Squads handleMaxSizeInput function works properly',()=>{
    const wrapper = setup(false);
    const inputBox=findByTestAttr(wrapper,'input-box').at(2);
    inputBox.simulate("change",{target: {value:10}});
    expect(mockSetState).toHaveBeenCalledWith({isLoading:false,Squad:{Codex: "Autobots",Name: '',Role: "GoodGuys",MinSize: '',MaxSize: 10,Units: ["Barricade"]}});
});
test('Edit Squads Rem-Unit Button works properly',()=>{
    const wrapper = setup(false);
    const remButton=findByTestAttr(wrapper,'remButton');
    remButton.simulate('click',{preventDefault () {}});
    expect(mockSetState).toHaveBeenCalledWith({isLoading:false,Squad:{Codex: "Autobots",Name: '',Role: "GoodGuys",MinSize: '',MaxSize: '',Units: []}});
});
test('Edit Squads Add-Unit Button works properly',()=>{
    const wrapper = setup(false);
    const addButton=findByTestAttr(wrapper,'addButton');
    addButton.simulate('click',{preventDefault () {}});
    expect(mockSetState).toHaveBeenCalled();
});
