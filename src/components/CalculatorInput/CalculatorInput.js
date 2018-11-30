import React from 'react';
import { PaypalResult, GrailedResult, StockXResult } from './CalculationResult';
import { Input } from 'react-materialize';
import ShippingInput from './ShippingInput';
import NumberFormat from 'react-number-format';
// Component that handles the input field for the calculators
const CalculatorInput = props => {
  return (
    <div>
      <div className="row calc-inputs">
        <NumberFormat
          onChange={e => props.setValue(e)}
          thousandSeparator={true}
          maxLength={15}
          allowNegative={false}
          decimalScale={2}
          id="price"
          type="text"
          customInput={Input}
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
