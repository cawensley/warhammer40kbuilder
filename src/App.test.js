import React from 'react';
import Enzyme , {mount} from 'enzyme';
import {findByTestAttr} from "./utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from "./App";
import store from "./Redux/store";
import LoginChange from "./Redux/actions/LoginChange";
import {Provider} from "react-redux";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = () => {
    return mount(
        <Provider store={store}>
            <App />
        </Provider>)
};

test('App renders when user is LoggedIN',()=>{
    store.dispatch(LoginChange(true));
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'APPLoggedIn');
    expect(component.length).toBe(1);
});
test('App renders when user is APPLoggedOut',()=>{
    store.dispatch(LoginChange(false));
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'APPLoggedOut');
    expect(component.length).toBe(1);
});