import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr,checkProp} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SubmitButton from "./SubmitButton";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<SubmitButton {...props}/>)
};

test('renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'component-button');
    expect(component.length).toBe(1);
});

test('renders button with proper text when given props',()=>{
    const wrapper = setup({buttontext:"IamHuman"});
    const component = findByTestAttr(wrapper,'component-button');
    expect(component.text()).toBe("IamHuman");
});

test('does not throw warning with expected props',()=>{
    const expectedProps = {buttontext:"IamHuman"};
    checkProp(SubmitButton,expectedProps);
});