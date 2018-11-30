import React from 'react';

// Component to render the results of each calculator
export const PaypalResult = props => {
  return (
    <div>
      {message !== null ? (
        <p className="result">{message}</p>
      ) : (
        <div>
          <p className="result">
            Total Fees: $<b>{props.result.fees}</b>
          </p>
          <p className="result">
            You Receive: $<b>{props.result.receive}</b>
          </p>
          <p className="result">
            Ask for: <b>${props.result.askFor}</b> if you want{' '}
            <b>${props.currValue.replace(/^0+/, '')}</b>
          </p>
          {props.shippingCost > 0 && props.checkBox ? (
            <p className="result">
              Grand Total:{' '}
              <b>${(props.result.receive - props.shippingCost).toFixed(2)}</b>
            </p>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export const GrailedResult = props => {
  return (
    <div>
      {message !== null ? (
        <p className="result">{message}</p>
      ) : (
        <div>
          <p className="result">
            Paypal Fees: <b>${props.result.fees}</b>
          </p>
          <p className="result">
            Grailed Fees: <b> ${props.result.grailedFees}</b>
          </p>
          <p className="result">
            You Receive: $<b>{props.result.receive}</b>
          </p>
          <p className="result">
            Ask for: $<b>{props.result.askFor}</b> if you want $
            {props.currValue}
          </p>
          {props.shippingCost > 0 && props.checkBox ? (
            <p className="result">
              Grand Total: $
              <b>{(props.result.receive - props.shippingCost).toFixed(2)}</b>
            </p>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};
export const StockXResult = props => {
  return (
    <div>
      {message !== null ? (
        <p className="result">{message}</p>
      ) : (
        <div>
          <p className="result">
            Transaction Fees: $<b>{props.result.transactionFee}</b>
          </p>
          <p className="result">
            Payment Process Fees: $<b>{props.result.payProcFee}</b>
          </p>
          <p className="result">
            You Receive: $<b>{props.result.receive}</b>
          </p>
          <p className="result">
            Ask for: <b>${props.result.askFor}</b> if you want $
            {props.currValue}
          </p>
        </div>
      )}
    </div>
  );
};
