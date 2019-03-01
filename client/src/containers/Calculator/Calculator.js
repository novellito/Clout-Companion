import React, { Component } from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import RowContainer from '../../hoc/rowContainer';
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
    shippingField: { Paypal: '', Grailed: '' }
  };
  // Function to set the value of each calculator input field
  setValue = e => {
    let calculation = null;
    // Determine which calculation to make
    const { value, name } = e.target;
    // do appropriate calculation
    switch (name) {
      case 'Paypal':
        calculation = calculatePaypal(value);
        break;
      case 'Grailed':
        calculation = calculateGrailed(value);
        break;
      default:
        calculation = calculateStockx(value, this.state.StockxRate);
    }
    this.setState({
      [e.target.name]: value,
      [e.target.name + 'Result']: calculation
    });

    if (value === '' || value === null) {
      let labelRef = this.state.shippingField[e.target.name]; // create this so state is not mutated directly
      // clear values
      if (
        // remove th3e active class from correct label
        this.state[e.target.name + 'Checkbox'] &&
        this.state[e.target.name + 'Shipping'] !== ''
      )
        labelRef.className = '';
      this.setState({
        [e.target.name]: '',
        [e.target.name + 'Result']: '',
        [e.target.name + 'Shipping']: '',
        shippingField: ''
      });
    }
  };

  // Set & validate the shipping price
  setShipping = e => {
    // update the correct shipping field
    const { name, value, nextSibling } = e.target;
    this.setState({
      shippingField: {
        ...this.state.shippingField,
        [name]: nextSibling
      }
    }); // Store reference for the shipping input field

    this.setState({
      [name + 'Result']: {
        ...this.state[name + 'Result'],
        status: ''
      },
      [name + 'Shipping']: value
    });

    if (value === '' || value === null) {
      // clear values
      this.setState({
        [name + 'Result']: {
          ...this.state[name + 'Result'],
          status: ''
        },
        [name + 'Shipping']: ''
      });
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
        <AppNavbar history={this.props.history} />
        <RowContainer>
          <h1 className="comp-title">Fee Calculator</h1>
          <Collapsible>
            <CollapsibleItem
              header={
                <CalculatorHeader
                  name="Paypal"
                  image={Paypal}
                  alt="Calculate Paypal Fees"
                />
              }
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
              header={
                <CalculatorHeader
                  name="Grailed"
                  image={Grailed}
                  alt="Calculate Grailed Fees"
                />
              }
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
              header={
                <CalculatorHeader
                  name="Stockx"
                  image={Stockx}
                  alt="Calculate Stockx Fees"
                />
              }
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
        </RowContainer>
      </div>
    );
  }
}

export default Calculator;
