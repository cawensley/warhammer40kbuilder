import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import {findByTestAttr} from "../../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ViewArmiesPage from "./ViewArmiesPage";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = () => {
    return shallow(<ViewArmiesPage/>)
};

test('View Armies Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'ViewArmiesPage');
    expect(component.length).toBe(1);
});