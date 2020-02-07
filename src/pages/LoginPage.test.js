import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import LoginPage from "./LoginPage";
import store from "../Redux/store";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<LoginPage {...props}/>)
};

test('Login Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'LoginPage');
    expect(component.length).toBe(1);
});

test('Login button click changes Login Status to true',()=>{
    const wrapper = setup();
    const loginButton=findByTestAttr(wrapper,'loginButton');
    loginButton.simulate('click',{preventDefault () {}});
    expect(store.getState().isLoggedIn).toEqual(true)
});