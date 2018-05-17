import React from 'react';
// Component that contains the calculator's header content
const CalculatorHeader = props => {
  return (
    <div>
      <img
        className={'calc-icon ' + props.name}
        src={props.image}
        alt={props.alt}
      />
      {props.name}
    </div>
  );
};

export default CalculatorHeader;
