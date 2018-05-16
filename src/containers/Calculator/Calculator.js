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
    StockxRate: 0.095,
    shippingField:''
  };
  // Function to set the value of each calculator input field
  setValue = e => {
    let calculation = null;
    // Determine which calculation to make
    const parsedValue = e.target.value.replace(/^0+/, '').replace(/\s+/g, ''); // remove leading 0's and extra spaces
    const validate = this.verifyValueInput(parsedValue);

    if (validate === -1) { // invalid character input
      this.setState({
        [e.target.name + 'Result']: {
          ...this.state[e.target.name + 'Result'],
          status: -1
        }
      });
    } else if (validate === 0) { // user entered a 0
      this.setState({
        [e.target.name + 'Result']: {
          ...this.state[e.target.name + 'Result'],
          status: 0
        }
      });
    } else {
      // do appropriate calculation
      switch (e.target.name) {
        case 'Paypal':
          calculation = calculatePaypal(parsedValue);
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
  
    if (parsedValue === '' || parsedValue === null) {
      // clear values
      let labelRef = this.state.shippingField; // create this so state is not mutated directly
      this.setState({
        [e.target.name]: '',
        [e.target.name + 'Result']: '',
        [e.target.name + 'Shipping']: '',
      });
      labelRef.className = '';
    }
  };

  // Set & validate the shipping price
  setShipping = e => {

    this.setState({shippingField: e.target.nextSibling}); // Store reference for the shipping input field
    const parsedValue = e.target.value.replace(/^0+/, '').replace(/\s+/g, '');
    const validate = this.verifyValueInput(parsedValue);
    if (validate === -1 && validate !== undefined) { // invalid character input
      this.setState({
        [e.target.name + 'Result']: {
          ...this.state[e.target.name + 'Result'],
          status: -1
        }
      });
    } else if (validate === 0) { // user entered a 0
      this.setState({
        [e.target.name + 'Result']: {
          ...this.state[e.target.name + 'Result'],
          status: 0
        }
      });
    } else {
      this.setState({
        [e.target.name + 'Result']: {
          ...this.state[e.target.name + 'Result'],
          status: ''
        },
        [e.target.name + 'Shipping']: e.target.value
      });
    }

    if (parsedValue === '' || parsedValue === null) {
      // clear values
      this.setState({
        [e.target.name + 'Result']: {
          ...this.state[e.target.name + 'Result'],
          status: ''
        },
        [e.target.name + 'Shipping']: ''
      });
    }
  };

  // verify that the input only contains numbers and 1 decimal
  verifyValueInput = value => {
    let regex = value.match(/^[0-9]\d*(\.{0,1})(\d{1,2})?$/);
    if (regex === null) {
      return -1;
    } else if (parseFloat(regex[0]) <= 0) {
      return 0;
    }
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
