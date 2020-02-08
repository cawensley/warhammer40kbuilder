import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SelectArray from "./SelectArray";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props) => {
    return shallow(<SelectArray {...props}/>)
};

const mockCodexArray = [{id:"11",Name:"PirateSquad11"},{id:"12",Name:"PirateSquad12"},{id:"13",Name:"PirateSquad13"}];
const mockArrayDisplay = ["PirateSquad21","PirateSquad22","PirateSquad23"];

test('SelectArray component renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'SelectArray');
    expect(component.length).toBe(1);
});

test('SelectArray Add-button calls function provided by Parent',()=>{
    let mockonItemAdd = jest.fn();
    const wrapper = setup({onItemAdd:mockonItemAdd});
    const addButton=findByTestAttr(wrapper,'addButton');
    addButton.simulate('click',{preventDefault () {}});
    expect(mockonItemAdd).toHaveBeenCalled()
});

test('SelectArray Remove-button calls function provided by Parent',()=>{
    let mockonItemRem = jest.fn();
    const wrapper = setup({onItemRemove:mockonItemRem});
    const remButton=findByTestAttr(wrapper,'remButton');
    remButton.simulate('click',{preventDefault () {}});
    expect(mockonItemRem).toHaveBeenCalled()
});

describe("react State testing",()=>{
    let wrapper;
    let mockSetThingSelected = jest.fn();

    beforeEach(()=>{
        mockSetThingSelected.mockClear();
        React.useState=jest.fn(()=>["",mockSetThingSelected]);
    });
    test('SelectArray options changes state of itemSelected',()=> {
        wrapper = setup({arrayDisplay:mockArrayDisplay,codexArray:mockCodexArray});
        const selectInput = findByTestAttr(wrapper, 'selectInput');
        selectInput.simulate('change',{target: {value:'train'}});
        expect(mockSetThingSelected).toBeCalledWith('train');
    });
    test('Test UseEffect works with a CodexArray provided',()=> {
        React.useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
        setup({codexArray:mockCodexArray});
        expect(mockSetThingSelected).toBeCalledWith('11');
    });
    test('Test UseEffect doesnt run when no CodexArray provided',()=> {
        React.useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
        setup();
        expect(mockSetThingSelected).not.toHaveBeenCalled();
    });
    test('Test UseEffect doesnt run when empty CodexArray provided',()=> {
        React.useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
        setup({codexArray:[],arrayDisplay: []});
        expect(mockSetThingSelected).not.toHaveBeenCalled();
    });
});