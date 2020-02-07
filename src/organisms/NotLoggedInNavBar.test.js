import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NotLoggedInNavBar from "./NotLoggedInNavBar";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<NotLoggedInNavBar {...props}/>)
};

test('NotLoggedInNavBar renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'NotLoggedInNavBar');
    expect(component.length).toBe(1);
});

describe("testing SHOW functionality of dropdown menu",()=>{
    let mockSetNavClass = jest.fn();
    let wrapper;

    beforeEach(()=>{
        mockSetNavClass.mockClear();
        React.useState=jest.fn(()=>["",mockSetNavClass]);
        wrapper = setup();
    });
    test('Dropdown button click changes classname to SHOW',()=>{
        const dropdownButton=findByTestAttr(wrapper,'dropdownButton');
        dropdownButton.simulate('click',{preventDefault () {}});
        expect(mockSetNavClass).toHaveBeenCalled();
    });
    test('Dropdown menu click changes classname to SHOW',()=>{
        const dropdownMenu=findByTestAttr(wrapper,'dropdown');
        dropdownMenu.simulate('click',{preventDefault () {}});
        expect(mockSetNavClass).toHaveBeenCalled();
    });
});
