// Paypal values
const RATE = 0.029;
const PERCENTAGE = 0.3;

// Grailed values
const GRAILED_RATE = 0.06;

export const calculatePaypal = amount => {
  const fees = roundTo(parseFloat(amount) * RATE + PERCENTAGE);
  return {
    fees,
    receive: roundTo(parseFloat(amount) - fees),
    askFor: roundTo((parseFloat(amount) + PERCENTAGE) / 0.971)
  };
};
export const calculateGrailed = amount => {
  const ppFees = roundTo(parseFloat(amount) * RATE + PERCENTAGE);
  const grailedFees = roundTo(parseFloat(amount) * GRAILED_RATE);
  return {
    fees: ppFees,
    grailedFees,
    receive: roundTo(
      parseFloat(amount) - parseFloat(grailedFees) - parseFloat(ppFees)
    ),
    askFor: roundTo((parseFloat(amount) + PERCENTAGE) / 0.911)
  };
};

export const calculateStockx = (amount, rate) => {
  const transactionFee = amount * rate;
  const payProcFee = amount * 0.03;
  return {
    transactionFee,
    payProcFee,
    receive: roundTo(
      parseFloat(amount) - parseFloat(transactionFee) - parseFloat(payProcFee)
    ),
    askFor: Math.floor(parseFloat(amount) / (1 - (0.03 + parseFloat(rate)))) + 1
  };
};

// https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
const roundTo = n => {
  n = parseFloat((n * Math.pow(10, 2)).toFixed(11));
  n = (Math.round(n) / Math.pow(10, 2)).toFixed(2);
  return n;
};
