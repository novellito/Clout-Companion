import React from 'react';

const rowContainer = props => {
  return (
    <div className="row">
      <div className="col s12 m10 l6 offset-l3 offset-m1">{props.children}</div>
    </div>
  );
};

export default rowContainer;
