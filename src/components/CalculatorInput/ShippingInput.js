import React from 'react';
import { Input } from 'react-materialize';

// component for handling the shipping price value
const ShippingInput = props => {
  return (
    <Input
      onChange={e => props.setShipping(e)}
      id="shipping"
      className="active"
      type="text"
      value={props.shippingCost}
      label={
        props.currValue === '' ? 'Enter A Price First' : 'Shipping Price ($)'
      }
      name={props.type}
      disabled={props.currValue === '' ? true : false}
    />
  );
};

export default ShippingInput;
