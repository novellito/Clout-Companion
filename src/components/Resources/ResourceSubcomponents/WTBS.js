import React, { Fragment } from 'react';

const WTBS = () => {
  const copy = () => {
    let template = document.getElementById('Invoice-template').select();
    document.execCommand('copy');

    document.getElementById('clipboard-btn').innerHTML = 'Copied!';
  };
  return (
    <Fragment>
      <p>
        Now that you've sucessfully copped something, where should you sell it?
      </p>
      <ul>
        <l1>Facebook Groups</l1>
        <l1>Stockx</l1>
        <l1>Grailed</l1>
        <l1>Ebay</l1>
        <l1>Goat</l1>
        <l1>Twitter</l1>
        <l1>Instagram</l1>
      </ul>
      <h1 className="section-title">Paypal Invoice Template</h1>
      <textarea
        className="materialize-textareaa"
        value="hello world"
        id="Invoice-template"
        disabled
      />
      <button id="clipboard-btn" onClick={() => copy()}>
        Copy to Clipboard
      </button>
    </Fragment>
  );
};

export default WTBS;
