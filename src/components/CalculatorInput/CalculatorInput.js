import React from 'react';
import { PaypalResult, GrailedResult } from './CalculationResult';
// Component that handles the input field for the calculators
const CalculatorInput = props => {
  return (
    <div>
      <div className="row">
        <div className="input-field">
          <input
            onChange={e => props.setValue(e.target.value, props.type)}
            id="price"
            type="text"
            className="validate"
          />
          <label htmlFor="price">Enter Price ($)</label>
        </div>
      </div>
      {props.result !== '' && props.type === 'Paypal' ? (
        <PaypalResult {...props} />
      ) : (
        ''
      )}
      {props.result !== '' && props.type === 'Grailed' ? (
        <GrailedResult {...props} />
      ) : (
        ''
      )}
    </div>
  );
};

export default CalculatorInput;
