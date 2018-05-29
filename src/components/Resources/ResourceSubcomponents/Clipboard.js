import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Clipboard extends React.Component {
  state = {
    copied: false,
    template: `TITLE: [ITEM]
        Invoice for [Item Name, size, condition]
        - 100% Authentic
        - [Condition]
        - [Items Included]
        - Pictures were provided to the buyer and he has agreed that condition is satisfactory for purchase.
        - Original box and accessories if applicable [List any accessories- og box, laces, etc]
          SHIPPING INFO
        - Once payment is received, item will be shipped within 24 hours via USPS (United States Postal Service). -USPS Priority Mail to be able to track the package manually and with signature confirmation to ensure the item is received at the PayPal confirmed address that is provided.
        TERMS & CONDITIONS
        - A tracking number will be provided, therefore any claim of un-received item or lost merchandise shall be resolved with PayPal.
        - Any unauthorized chargebacks for this item are fraudulent and will be resolved through PayPal's dispute center in fairness to both buyer and seller.
        - No Returns/Exchanges - Unless through seller error (e.g. shipping the wrong item)
        - Upon payment of this invoice, the buyer acknowledges that "charge-backs" or "unauthorized purchases/transactions" initiated via their bank and/or creditor should be recognized by PayPal as an attempt to fraudulently keep the merchandise of the seller while receiving reimbursement`
  };

  render() {
    return (
      <div>
        <CopyToClipboard
          text={this.state.template}
          onCopy={() => this.setState({ copied: true })}
        >
          <button className="">Copy to clipboard</button>
        </CopyToClipboard>

        {this.state.copied ? (
          <span style={{ color: 'red' }}>Copied.</span>
        ) : null}
      </div>
    );
  }
}

export default Clipboard;
