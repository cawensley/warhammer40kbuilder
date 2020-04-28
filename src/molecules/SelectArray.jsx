import React from 'react';
import PropTypes from 'prop-types';
import IDtoName from '../atoms/IDtoName';
import store from '../Redux/store';
import './SelectArray.scss';

const SelectArray = ({
  codexArray, left, onItemAdd, onItemRemove, arrayDisplay,
}) => {
  const [thingSelected, setThingSelected] = React.useState();

  // eslint-disable-next-line
    React.useEffect(()=>{if (codexArray.length > 0) {setThingSelected(codexArray[0].id)}},[store.getState().codex]);

  return (
    <div data-test="SelectArray">
      <div className="row mt-4">
        <div className="text-warning col-4 col-md-6 text-right">{left}</div>
        <div className="text-white col-8 col-md-6 text-left d-md-flex">
          <select
            data-test="selectInput"
            className="bg-white m-SelectArray-maxwidth"
            value={thingSelected}
            onChange={(event) => setThingSelected(event.target.value)}
          >
            {(codexArray.length > 0)
              ? codexArray.map(
                (item) => <option key={item.id} value={item.id}>{item.Name}</option>,
              )
              : <option key="0" value="0">No Array Provided</option>}
          </select>
          <button data-test="addButton" type="button" className="btn btn-sm btn-success ml-2 mt-1" onClick={() => onItemAdd(thingSelected)}>Add</button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="text-warning col-4 col-md-6 text-right">
          Selected&nbsp;
          {left}
        </div>
        <div className="text-white col-8 col-md-6 text-left">
          {(arrayDisplay.length > 0)
            ? arrayDisplay.map(
              (item) => (
                <div key={item} className="row mt-1">
                  <IDtoName searchArray={codexArray} uniqueID={item} />
                  <button data-test="remButton" type="button" className="btn btn-sm btn-danger ml-2" onClick={() => onItemRemove(item)}>Remove</button>
                </div>
              ),
            )
            : 'Nothing Selected'}
        </div>
      </div>
    </div>
  );
};

SelectArray.propTypes = {
  codexArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    Name: PropTypes.string,
  })),
  left: PropTypes.string,
  onItemAdd: PropTypes.func,
  onItemRemove: PropTypes.func,
  arrayDisplay: PropTypes.arrayOf(PropTypes.string),
};

SelectArray.defaultProps = {
  codexArray: null,
  left: null,
  onItemAdd: null,
  onItemRemove: null,
  arrayDisplay: null,
};

export default SelectArray;
