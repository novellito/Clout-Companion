import React from 'react';
import { Input } from 'react-materialize';

// component for handling the shipping price value
const ShippingInput = props => {
  console.log(props.type);
  return (
    <Input
      onChange={e => props.setShipping(e)}
      id="shipping"
      type="text"
      className="validate"
      label="Shipping Price ($)"
      name={props.type}
    />
  );
};

export default ShippingInput;
