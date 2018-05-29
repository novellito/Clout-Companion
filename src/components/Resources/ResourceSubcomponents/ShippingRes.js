import React, { Fragment } from 'react';
import Clipboard from './Clipboard';

const ShippingRes = () => {
  return (
    <Fragment>
      <h1 className="section-title">Paypal Invoice Template</h1>
      <div className="template">
        <p>Invoice for [Item Name, size, condition]</p>
        <ul>
          <li>100% Authentic</li>
          <li>[Condition]</li>
          <li>[Items Included]</li>
          <li>
            Pictures were provided to the buyer and he has agreed that condition
            is satisfactory for purchase.
          </li>
          <li>
            Original box and accessories if applicable [List any accessories- og
            box, laces, etc]
          </li>
          <li>SHIPPING INFO</li>
          <li>
            Once payment is received, item will be shipped within 24 hours via
            USPS (United States Postal Service). -USPS Priority Mail to be able
            to track the package manually and with signature confirmation to
            ensure the item is received at the PayPal confirmed address that is
            provided.
          </li>
          <li>TERMS & CONDITIONS</li>
          <li>
            A tracking number will be provided, therefore any claim of
            un-received item or lost merchandise shall be resolved with PayPal.
          </li>
          <li>
            -Any unauthorized chargebacks for this item are fraudulent and will
            be resolved through PayPal's dispute center in fairness to both
            buyer and seller.
          </li>
          <li>
            No Returns/Exchanges - Unless through seller error (e.g. shipping
            the wrong item)
          </li>
          <li>
            Upon payment of this invoice, the buyer acknowledges that
            "charge-backs" or "unauthorized purchases/transactions" initiated
            via their bank and/or creditor should be recognized by PayPal as an
            attempt to fraudulently keep the merchandise of the seller while
            receiving reimbursement`
          </li>
        </ul>
      </div>
      <Clipboard />
    </Fragment>
  );
};

export default ShippingRes;
