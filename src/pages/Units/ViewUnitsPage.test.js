import React from 'react';
import Enzyme , {mount} from 'enzyme';
import {findByTestAttr} from "../../utilities/testutils";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import store from "../../Redux/store";
import {Provider} from "react-redux";
import { HashRouter as Router } from 'react-router-dom';
import ViewUnitsPage from "./ViewUnitsPage";
import CodexChange from "../../Redux/actions/CodexChange";
import UnitsChange from "../../Redux/actions/UnitsChange";

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = () => {
    return mount(
        <Provider store={store}>
            <Router>
                <ViewUnitsPage/>
            </Router>
        </Provider>
    )
};

test('View Units Page renders without error',()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'ViewUnitsPage');
    expect(component.length).toBe(1);
});
test('View Units Page renders data when Codex and UnitsArray are in redux',()=>{
    store.dispatch(CodexChange("Pirates"));
    const mockUnitsArray = [{id:"11",Codex:"Ninjas",Name:"UnitSneaky",Gear:["sword"]},{id:"22",Codex:"Pirates",Name:"UnitBlack",Gear:["pistol"]}];
    store.dispatch(UnitsChange(mockUnitsArray));
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'unitsDisplay');
    expect(component.length).toBe(1);
});
