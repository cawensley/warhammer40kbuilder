import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr,checkProp} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PageTitle from "./PageTitle";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<PageTitle {...props}/>)
};

test('renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'component-Title');
    expect(component.length).toBe(1);
});

test('renders exact Title as given props',()=>{
    const wrapper = setup({Title: "Hello World"});
    const message = findByTestAttr(wrapper,'component-Title');
    expect(message.text()).toBe("Hello World");
});

test('does not throw warning with expected props',()=>{
    const expectedProps = {Title:"Hello Out There"};
    checkProp(PageTitle,expectedProps);
});