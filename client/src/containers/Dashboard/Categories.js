import React from 'react';

const Categories = props => {
  return (
    <div className="categories">
      <p>Category: {props.category}</p>
      <i
        style={{
          color: props.category === 'shoes' ? '#ff3547b3' : 'white'
        }}
        onClick={e => props.click(e.target.id)}
        id="shoes"
        className="fas shoes fa-3x fa-shoe-prints"
      />
      <i
        style={{
          color: props.category === 'clothes' ? '#ff3547b3' : 'white'
        }}
        onClick={e => props.click(e.target.id)}
        id="clothes"
        className="fas fa-3x fa-tshirt"
      />
      <i
        style={{
          color: props.category === 'accessories' ? '#ff3547b3' : 'white'
        }}
        onClick={e => props.click(e.target.id)}
        id="accessories"
        className="fas fa-3x fa-glasses"
      />
      <i
        style={{
          color: props.category === 'other' ? '#ff3547b3' : 'white'
        }}
        onClick={e => props.click(e.target.id)}
        id="other"
        className="fas fa-3x fa-ellipsis-h"
      />
    </div>
  );
};

export default Categories;
