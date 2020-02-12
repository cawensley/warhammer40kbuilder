import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RegisterPage from "./RegisterPage";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = () => {
    return shallow(<RegisterPage/>)
};

test('Register Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'RegisterPage');
    expect(component.length).toBe(1);
});