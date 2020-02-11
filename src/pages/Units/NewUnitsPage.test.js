import React from 'react';
import Enzyme , {mount} from 'enzyme';
import {findByTestAttr} from "../../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from "firebase/app";
import {firestore} from "../../utilities/mockFirestore";
import NewUnitsPage from "./NewUnitsPage";

firebase.firestore = firestore;
Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = () => {
    return mount(<NewUnitsPage/>)
};

test('New Units Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'newUnitsPage');
    expect(component.length).toBe(1);
});

test('New Units submit button click calls Add function',()=>{
    const wrapper = setup();
    const submitButton=findByTestAttr(wrapper,'submitButton');
    submitButton.simulate('submit',{preventDefault () {}});
    expect(firestore().collection).toHaveBeenCalledWith("units");
});

describe("function testing for NewUnitsPage",()=>{
    let wrapper;
    let mocknewUnit;
    let mocksetNewUnit = jest.fn();

    beforeEach(()=>{
        mocksetNewUnit.mockClear();
        mocknewUnit = {Codex: "Ninjas",Name:'',Cost:'',Abilities:"None",Gear:["ID10"]};
        React.useState=jest.fn(()=>[mocknewUnit,mocksetNewUnit]);
        wrapper = setup();
    });
    test('New Units handleNameInput function works properly',()=>{
        const inputNameBox=findByTestAttr(wrapper,'input-box').at(0);
        inputNameBox.simulate("change",{target: {value:'Benny'}});
        expect(mocksetNewUnit).toHaveBeenCalledWith({...mocknewUnit,Name:"Benny"});
    });
    test('New Units handleCostInput function works properly',()=>{
        const inputCostBox=findByTestAttr(wrapper,'input-box').at(1);
        inputCostBox.simulate("change",{target: {value:'2'}});
        expect(mocksetNewUnit).toHaveBeenCalledWith({...mocknewUnit,Cost: 2})
    });
    test('New Units handleAbilitiesInput function works properly',()=>{
        const inputCostBox=findByTestAttr(wrapper,'input-box').at(2);
        inputCostBox.simulate("change",{target: {value:"Throwing"}});
        expect(mocksetNewUnit).toHaveBeenCalledWith({...mocknewUnit,Abilities: "Throwing"})
    });
    test('SelectArray Add-button calls handleGearAdd function',()=>{
        const addButton=findByTestAttr(wrapper,'addButton');
        addButton.simulate('click',{preventDefault () {}});
        expect(mocksetNewUnit).toHaveBeenCalled();
    });
    test('SelectArray Rem-button calls handleGearRem function',()=>{
        const remButton=findByTestAttr(wrapper,'remButton');
        remButton.simulate('click',{preventDefault () {}});
        expect(mocksetNewUnit).toHaveBeenCalledWith({...mocknewUnit,Gear: []})
    });
});