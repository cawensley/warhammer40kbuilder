import React, {useState} from 'react';
import IDtoName from "../atoms/IDtoName";

function SelectArray ({codexArray, left, onItemAdd, onItemRemove,arrayDisplay}) {
    const [thingSelected,setThingSelected]=useState(codexArray[0].id);

    function onThingAdd () {onItemAdd(thingSelected)}
    function onThingRemove () {onItemRemove()}

    return (
        <div>
            <div className="row mt-4">
                <div className="text-warning col-6 text-right">{left}</div>
                <div className="text-white col-6 text-left">
                    <select
                        id="ThingSelection"
                        className="bg-white"
                        value={thingSelected}
                        onChange={event => setThingSelected(event.target.value)}>
                        {codexArray.map((item) => (<option key={item.id} value={item.id}>{item.Name}</option>))}
                    </select>
                    <button type="button" className="btn btn-success ml-2" onClick={onThingAdd}>Add</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={onThingRemove}>Remove Last</button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="text-warning col-6 text-right">Selected&nbsp;{left}</div>
                <div className="text-white col-6 text-left">
                    {arrayDisplay.length === 0
                        ? "Nothing Selected"
                        : arrayDisplay.map((item)=><IDtoName key={item} searchArray={codexArray} uniqueID={item}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectArray;