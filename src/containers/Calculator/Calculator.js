import React, { Component } from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import {
  calculatePaypal,
  calculateGrailed
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
    GrailedCheckbox: false
  };
  // Function to set the value of each calculator input field
  setValue = e => {
    let calculation = null;

    // Determine which calculation to make
    switch (e.target.name) {
      case 'Paypal':
        calculation = calculatePaypal(e.target.value);
        break;
      case 'Grailed':
        calculation = calculateGrailed(e.target.value);
        break;
    }

    e.target.value === ''
      ? this.setState({
          [e.target.name]: '',
          [e.target.name + 'Result']: '',
          [e.target.name + 'Shipping']: ''
        })
      : this.setState({
          [e.target.name]: e.target.value,
          [e.target.name + 'Result']: calculation
        });
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
              {/* <CollapsibleItem
                header={<CalculatorHeader name="Stockx" image={Stockx} />}
              >
                <CalculatorInput
                  onClick={() => this.setCurrentCalc('Stockx')}
                  setValue={this.setValue}
                  // result={}
                  type={this.state.calculatorType}
                />
              </CollapsibleItem> */}
            </Collapsible>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
