import React from 'react';
import { PaypalResult, GrailedResult } from './CalculationResult';
import { Input } from 'react-materialize';

import ShippingInput from './ShippingInput';
// Component that handles the input field for the calculators
const CalculatorInput = props => {
  return (
    <div>
      <div className="row calc-inputs">
        <Input
          onChange={e => props.setValue(e.target.value, props.type)}
          id="price"
          type="text"
          className="validate"
          label="Enter Price ($)"
        />

        {props.checkBox ? <ShippingInput {...props} /> : ''}
      </div>
      <div className="row">
        <Input
          onChange={e => props.toggleCheckBox(e, props.type)}
          name="shipping"
          type="checkbox"
          checked={props.checkBox}
          label="toggle shipping"
        />
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
