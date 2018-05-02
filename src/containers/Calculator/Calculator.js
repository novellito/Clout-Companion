import React, { Component } from 'react';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import CalculatorInput from '../../components/CalculatorInput/CalculatorInput';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import Paypal from '../../assets/paypal-icon.svg';
import Grailed from '../../assets/grailed-icon.png';
import Stockx from '../../assets/stockx-icon.png';
import {
  calculatePaypal,
  calculateGrailed
} from '../../components/CalculatorInput/Formulas';
import './Calculator.css';
class Calculator extends Component {
  state = {
    value: '',
    calculatorType: '',
    result: ''
  };

  setValue = value => {
    this.setState({ value });
  };

  setCurrentCalc = calculatorType => {
    this.setState({ calculatorType });
  };

  doCalculation = e => {
    // calculatePaypal();
    // calculateGrailed();
    if (e.type === 'click' || e.key === 'Enter') {
      this.setState({ result: this.state.value });
    }
  };
  // TODO: just calculate without having to hit enter?
  render() {
    return (
      <div>
        <AppNavbar />
        <div className="row">
          <div className="col s12 m6 offset-m3 ">
            <h1 className="comp-title">Fee Calculator</h1>
            <ul className="collapsible">
              <li>
                <div className="collapsible-header">
                  <img
                    className="calc-icon paypal"
                    src={Paypal}
                    alt="Calculate Paypal Fees"
                  />
                  Paypal
                </div>
                <div className="collapsible-body">
                  <CalculatorInput
                    onClick={() => this.setCurrentCalc('Paypal')}
                    doCalc={e => this.doCalculation(e)}
                    setValue={this.setValue}
                    result={this.state.result}
                  />
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <img
                    className="calc-icon grailed"
                    src={Grailed}
                    alt="Calculate Grailed Fees"
                  />
                  Grailed
                </div>
                <div className="collapsible-body">
                  <CalculatorInput
                    onClick={() => this.setCurrentCalc('Grailed')}
                    doCalc={this.doCalculation}
                    setValue={this.setValue}
                  />
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <img
                    className="calc-icon stockx"
                    src={Stockx}
                    alt="Calculate Stockx Fees"
                  />
                  Stockx
                </div>
                <div className="collapsible-body">
                  <CalculatorInput
                    onClick={() => this.setCurrentCalc('Stockx')}
                    doCalc={this.doCalculation}
                    setValue={this.setValue}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
