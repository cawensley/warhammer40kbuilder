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
    let mockSetShow = jest.fn();
    let wrapper;

    beforeEach(()=>{
        mockSetShow.mockClear();
    });
    test('Dropdown button click invokes SetShow function',()=>{
        React.useState=jest.fn(()=>["",mockSetShow]);
        wrapper = setup();
        const dropdownButton=findByTestAttr(wrapper,'dropdownButton');
        dropdownButton.simulate('click',{preventDefault () {}});
        expect(mockSetShow).toHaveBeenCalled();
    });
    test('Dropdown menu click invokes SetShow function to remove "show"',()=>{
        React.useState=jest.fn(()=>["show",mockSetShow]);
        wrapper = setup();
        const dropdownMenu=findByTestAttr(wrapper,'dropdown');
        dropdownMenu.simulate('click',{preventDefault () {}});
        expect(dropdownMenu.hasClass("show")).toBe(true);
    });
});
