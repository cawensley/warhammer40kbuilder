import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MainNavBar from "./MainNavBar";
import store from "../Redux/store";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<MainNavBar {...props}/>)
};

test('MainNavBar renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'MainNavBar');
    expect(component.length).toBe(1);
});

describe("testing SHOW functionality of dropdown left and right menu's",()=>{
    let mockSetShow = jest.fn();
    let wrapper;

    beforeEach(()=>{
        mockSetShow.mockClear();
    });
    test('Left Dropdown button click invokes SetShow function',()=>{
        React.useState=jest.fn(()=>["",mockSetShow]);
        wrapper = setup();
        const dropdownButton=findByTestAttr(wrapper,'leftdropdownButton');
        dropdownButton.simulate('click',{preventDefault () {}});
        expect(mockSetShow).toHaveBeenCalled();
    });
    test('Left Dropdown menu click invokes SetShow function to remove "show"',()=>{
        React.useState=jest.fn(()=>["show",mockSetShow]);
        wrapper = setup();
        const dropdownMenu=findByTestAttr(wrapper,'leftdropdownMenu');
        dropdownMenu.simulate('click',{preventDefault () {}});
        expect(dropdownMenu.hasClass("show")).toBe(true);
    });
    test('Right Dropdown button click invokes SetShow function',()=>{
        React.useState=jest.fn(()=>["",mockSetShow]);
        wrapper = setup();
        const dropdownButton=findByTestAttr(wrapper,'rightdropdownButton');
        dropdownButton.simulate('click',{preventDefault () {}});
        expect(mockSetShow).toHaveBeenCalled();
    });
    test('Right Dropdown menu click invokes SetShow function to remove "show"',()=>{
        React.useState=jest.fn(()=>["show",mockSetShow]);
        wrapper = setup();
        const dropdownMenu=findByTestAttr(wrapper,'rightdropdownMenu');
        dropdownMenu.simulate('click',{preventDefault () {}});
        expect(dropdownMenu.hasClass("show")).toBe(true);
    });
});
test('Logout button click changes redux loginstatus to false',()=>{
    const wrapper = setup();
    const Button=findByTestAttr(wrapper,'logoutButton');
    Button.simulate('click',{preventDefault () {}});
    expect(store.getState().isLoggedIn).toBe(false)
});
