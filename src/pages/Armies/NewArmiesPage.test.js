import React from 'react';
import Enzyme , {mount} from 'enzyme';
import {findByTestAttr} from "../../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NewArmiesPage from "./NewArmiesPage";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = () => {
    return mount(<NewArmiesPage/>)
};

test('New Armies Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'NewArmiesPage');
    expect(component.length).toBe(1);
});