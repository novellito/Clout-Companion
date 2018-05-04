import React from 'react';
import { PaypalResult, GrailedResult, StockXResult } from './CalculationResult';
import { Input } from 'react-materialize';
import ShippingInput from './ShippingInput';

// Component that handles the input field for the calculators
const CalculatorInput = props => {
  return (
    <div>
      <div className="row calc-inputs">
        <Input
          onChange={e => props.setValue(e)}
          id="price"
          type="text"
          className="validate"
          label="Enter Price ($)"
          name={props.type}
        />
        {props.type === 'Stockx' ? (
          <Input
            onChange={e => props.stockxRate(e.target.value)}
            type="select"
            defaultValue="9.5"
            label="select rate"
            name={props.type}
          >
            <option value=".095">Lvl 1 : 9.5%</option>
            <option value=".09">Lvl 2 : 9%</option>
            <option value=".085">Lvl 3 : 8.5%</option>
            <option value=".08">Lvl 4 : 8%</option>
          </Input>
        ) : (
          ''
        )}
        {props.checkBox ? <ShippingInput {...props} /> : ''}
      </div>
      {props.type !== 'Stockx' ? (
        <div className="row">
          <Input
            onChange={e => props.toggleCheckBox(e)}
            name="shipping"
            type="checkbox"
            label="toggle shipping"
            name={props.type}
            checked={props.checkBox}
          />
        </div>
      ) : (
        ''
      )}
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
      {props.result !== '' && props.type === 'Stockx' ? (
        <StockXResult {...props} />
      ) : (
        ''
      )}
    </div>
  );
};

export default CalculatorInput;
