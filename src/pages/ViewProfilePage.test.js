import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ViewProfilePage from "./ViewProfilePage";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={}) => {
    return shallow(<ViewProfilePage {...props}/>)
};

test('View Profile Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'ViewProfilePage');
    expect(component.length).toBe(1);
});