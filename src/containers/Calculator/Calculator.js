import React, { Component } from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import {
  calculatePaypal,
  calculateGrailed,
  calculateStockx
} from '../../components/CalculatorInput/Formulas';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import CalculatorInput from '../../components/CalculatorInput/CalculatorInput';
import CalculatorHeader from './CalculatorHeader';
import Paypal from '../../assets/paypal-icon.svg';
import Grailed from '../../assets/grailed-icon.png';
import Stockx from '../../assets/stockx-icon.png';
import './Calculator.css';

class Calculator extends Component {
  state = {
    Paypal: '',
    PaypalResult: '',
    PaypalShipping: '',
    PaypalCheckbox: false,
    Grailed: '',
    GrailedResult: '',
    GrailedShipping: '',
    GrailedCheckbox: false,
    Stockx: '',
    StockxResult: '',
    StockxRate: 0.095
  };
  // Function to set the value of each calculator input field
  setValue = e => {
    let calculation = null;
    // Determine which calculation to make
    const parsedValue = e.target.value.replace(/^0+/, '').replace(/\s+/g, '');
    const validate = this.verifyValueInput(parsedValue);

    if (validate === -1) {
      this.setState({ [e.target.name + 'Result']: -1 });
    } else if (validate === 0) {
      this.setState({ [e.target.name + 'Result']: 0 });
    } else {
      switch (e.target.name) {
        case 'Paypal':
          calculation = calculatePaypal(parsedValue); // strip leading 0's
          break;
        case 'Grailed':
          calculation = calculateGrailed(parsedValue);
          break;
        default:
          calculation = calculateStockx(parsedValue, this.state.StockxRate);
      }
      this.setState({
        [e.target.name]: parsedValue,
        [e.target.name + 'Result']: calculation
      });
    }
    if (parsedValue === '' || null)
      this.setState({
        [e.target.name]: '',
        [e.target.name + 'Result']: '',
        [e.target.name + 'Shipping']: ''
      });
  };

  // verify that the input only contains numbers and 1 decimal
  verifyValueInput = value => {
    let regex = value.match(/^[0-9]\d*(\.\d+)?$/);
    if (regex === null) {
      return -1;
    } else if (parseFloat(regex[0]) <= 0) {
      return 0;
    }
  };

  // Set the shipping price
  setShipping = e => {
    this.setState({ [e.target.name + 'Shipping']: e.target.value });
  };

  // Keep track of whether the user wants to include shipping fees
  toggleCheckBox = e => {
    this.setState({
      [e.target.name + 'Checkbox']: !this.state[e.target.name + 'Checkbox'],
      [e.target.name + 'Shipping']: ''
    });
  };

  // Update the selected stockx rate
  changeStockxRate = StockxRate => {
    this.setState({ StockxRate });
    if (this.state.Stockx !== '') {
      this.setState({
        StockxResult: calculateStockx(this.state.Stockx, this.state.StockxRate)
      });
    }
  };

  render() {
    return (
      <div>
        <AppNavbar />
        <div className="row">
          <div className="col s12 m10 l6 offset-l3 offset-m1 ">
            <h1 className="comp-title">Fee Calculator</h1>
            <Collapsible>
              <CollapsibleItem
                header={<CalculatorHeader name="Paypal" image={Paypal} />}
              >
                <CalculatorInput
                  type={'Paypal'}
                  setValue={this.setValue}
                  currValue={this.state.Paypal}
                  setShipping={this.setShipping}
                  result={this.state.PaypalResult}
                  checkBox={this.state.PaypalCheckbox}
                  toggleCheckBox={this.toggleCheckBox}
                  shippingCost={this.state.PaypalShipping}
                />
              </CollapsibleItem>
              <CollapsibleItem
                header={<CalculatorHeader name="Grailed" image={Grailed} />}
              >
                <CalculatorInput
                  type={'Grailed'}
                  setValue={this.setValue}
                  currValue={this.state.Grailed}
                  setShipping={this.setShipping}
                  result={this.state.GrailedResult}
                  checkBox={this.state.GrailedCheckbox}
                  toggleCheckBox={this.toggleCheckBox}
                  shippingCost={this.state.GrailedShipping}
                />
              </CollapsibleItem>
              <CollapsibleItem
                header={<CalculatorHeader name="Stockx" image={Stockx} />}
              >
                <CalculatorInput
                  type={'Stockx'}
                  setValue={this.setValue}
                  currValue={this.state.Stockx}
                  result={this.state.StockxResult}
                  stockxRate={this.changeStockxRate}
                />
              </CollapsibleItem>
            </Collapsible>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
