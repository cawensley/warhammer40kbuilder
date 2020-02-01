import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PageLoading from "./PageLoading";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<PageLoading {...props}/>)
};

test('renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'loadingSpinCog');
    expect(component.length).toBe(1);
});