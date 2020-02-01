import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr,checkProp} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RedirectButton from "./RedirectButton";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<RedirectButton {...props}/>)
};

test('renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'component-button');
    expect(component.length).toBe(1);
});

test('renders button with proper text when given props',()=>{
    const wrapper = setup({buttontext:"HelloPuppy",redirect: "/vitalpage/new"});
    const component = findByTestAttr(wrapper,'component-button');
    expect(component.text()).toBe("HelloPuppy");
});

test('does not throw warning with expected props',()=>{
    const expectedProps = {buttontext:"HelloPuppy",redirect: "/vitalpage/new"};
    checkProp(RedirectButton,expectedProps);
});