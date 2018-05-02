import React from 'react';

const CalculatorInput = props => {
  const setContent = e => {
    props.setValue(e.target.value);
  };
  return (
    <div>
      <div className="row">
        <div className="input-field">
          <input
            onKeyPress={props.doCalc}
            onClick={e => props.onClick(e)}
            onChange={setContent}
            id="first_name"
            type="text"
            className="validate"
          />
          <label htmlFor="first_name">Enter Price</label>
        </div>

        <div className="calculate">
          <button
            onClick={e => props.doCalc(e)}
            className="waves-effect waves-light btn btn-sm btn-primary"
          >
            Calculate
          </button>
        </div>
        <div className="result">{props.result === '' ? '' : props.result}</div>
      </div>
    </div>
  );
};

export default CalculatorInput;
