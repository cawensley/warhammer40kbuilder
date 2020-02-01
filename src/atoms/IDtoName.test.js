import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr,checkProp} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import IDtoName from "./IDtoName";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<IDtoName {...props}/>)
};

const defaultArray = [{id: "12",Name: "John"},{id: "1234",Name:"Bob"},{id:"123456",Name:"Janice"}];

test('renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'name-absent');
    expect(component.length).toBe(1);
});

test('renders proper Real Name given props of UniqueID with an Array that contains it',()=>{
    const wrapper = setup({uniqueID: "1234",searchArray:defaultArray});
    const component = findByTestAttr(wrapper,'name-found');
    expect(component.text()).toBe("Bob");
});

test('renders UniqueID when given props of UniqueID with an Array that doesnt have it',()=>{
    const wrapper = setup({uniqueID: "89asdf",searchArray:defaultArray});
    const component = findByTestAttr(wrapper,'name-absent');
    expect(component.text()).toBe("89asdf");
});

test('does not throw warning with expected props',()=>{
    const expectedProps = {uniqueID:"Hello Out There"};
    checkProp(IDtoName,expectedProps);
});