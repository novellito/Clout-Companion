// Paypal values
const RATE = 0.029;
const PERCENTAGE = 0.3;

// Grailed values
const GRAILED_RATE = 0.06;

export const calculatePaypal = amount => {
  const fees = roundTo(amount * RATE + PERCENTAGE);
  return {
    fees,
    receive: roundTo(amount - fees),
    askFor: roundTo((parseFloat(`${amount}`) + PERCENTAGE) / 0.971)
  };
};
export const calculateGrailed = amount => {
  const ppFees = roundTo(amount * RATE + PERCENTAGE);
  const grailedFees = roundTo(amount * GRAILED_RATE);
  return {
    fees: ppFees,
    grailedFees,
    receive: roundTo(amount - grailedFees - ppFees),
    askFor: roundTo((parseFloat(`${amount}`) + PERCENTAGE) / 0.911)
  };
};

// https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
const roundTo = n => {
  n = parseFloat((n * Math.pow(10, 2)).toFixed(11));
  n = (Math.round(n) / Math.pow(10, 2)).toFixed(2);
  return n;
};
