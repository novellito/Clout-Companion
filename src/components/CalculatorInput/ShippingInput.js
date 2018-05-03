import React from 'react';
import { Input } from 'react-materialize';

// component for handling the shipping price value
const ShippingInput = props => {
  return (
    <Input
      onChange={e => props.setShipping(e.target.value, props.type)}
      id="shipping"
      type="text"
      className="validate"
      label="Shipping Price ($)"
    />
  );
};

export default ShippingInput;
