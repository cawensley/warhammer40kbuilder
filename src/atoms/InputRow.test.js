import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr,checkProp} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import InputRow from "./InputRow";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<InputRow {...props}/>)
};

test('renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'inputRow');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props',()=>{
    const expectedProps = {left:"Hello Out There"};
    checkProp(InputRow,expectedProps);
});

test('Input Component returns value of input box change to Parent',()=>{
    let mockonInputChange = jest.fn();
    const wrapper = setup({onInputChange:mockonInputChange});
    const inputBox=findByTestAttr(wrapper,'input-box');
    inputBox.simulate("change",{target: {value:'FakeName'}});
    expect(mockonInputChange).toHaveBeenCalledWith('FakeName');
});