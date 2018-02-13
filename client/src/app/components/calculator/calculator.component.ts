import {Component, OnInit} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';

@Component({selector: 'app-calculator', templateUrl: './calculator.component.html', styleUrls: ['./calculator.component.scss']})
export class CalculatorComponent implements OnInit {


  RATE = .029;
  PERCENTAGE = .3;
  GRAILED_RATE = .06;
  invalidInput = false;

  displayPaypal = false;
  displayGrailed = false;

  amt = {
    paypalFees: 0,
    grailedFees: 0,
    receive: 0,
    askFor: 0
  };

  constructor() {}

  ngOnInit() {}

  calcPaypal(amount: number) {

    if (!isNumeric(amount) || amount <= 0) {
      this.invalidInput = true;

    } else {
      this.invalidInput = false;
      this.amt.paypalFees = this.roundTo(amount * this.RATE + this.PERCENTAGE);
      this.amt.receive = this.roundTo(amount - this.amt.paypalFees);
      this.amt.askFor = this.roundTo(((parseFloat(`${amount}`) + this.PERCENTAGE) / (.971)));
      this.displayPaypal = true;
    }

  }

  calcGrailed(amount: number){
    if (!isNumeric(amount) || amount <= 0) {
      this.invalidInput = true;

    } else {
      this.invalidInput = false;
      this.amt.paypalFees = this.roundTo(amount * this.RATE + this.PERCENTAGE);      
      this.amt.grailedFees = this.roundTo(amount * this.GRAILED_RATE);
      this.amt.receive = this.roundTo(amount - this.amt.grailedFees - this.amt.paypalFees );
      this.amt.askFor = this.roundTo(((parseFloat(`${amount}`) + this.PERCENTAGE) / (.911)));
      this.displayGrailed = true;
    }

  }

  // https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
  roundTo(n) {
    n = parseFloat((n * Math.pow(10, 2)).toFixed(11));
    n = (Math.round(n) / Math.pow(10, 2)).toFixed(2);
    return n;
  }

  resetVals(){
    this.invalidInput = false;
    this.amt.grailedFees = 0;
    this.amt.paypalFees = 0;
    this.amt.receive = 0;
    this.amt.askFor = 0;
    this.displayPaypal = false;
    this.displayGrailed = false;
  }

}
