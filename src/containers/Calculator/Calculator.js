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
    paypalValue: '',
    paypalResult: '',
    paypalShipping: '',
    paypalCheckbox: false,
    grailedValue: '',
    grailedResult: '',
    grailedShipping: '',
    grailedCheckbox: false
  };

  // Function to set the value of each calculator input field
  setValue = (value, type) => {
    switch (type) {
      case 'Paypal':
        this.setState({ paypalValue: value }, () => {
          this.state.paypalValue === ''
            ? this.setState({ paypalResult: '' })
            : this.setState({
                paypalResult: calculatePaypal(this.state.paypalValue)
              });
        });
        break;
      case 'Grailed':
        this.setState({ grailedValue: value }, () => {
          this.state.grailedValue === ''
            ? this.setState({ grailedResult: '' })
            : this.setState({
                grailedResult: calculateGrailed(this.state.grailedValue)
              });
        });
        break;
      default:
        console.log('default');
        break;
    }
  };

  setShipping = (value, type) => {
    switch (type) {
      case 'Paypal':
        this.setState({ paypalShipping: value }, () => {
          this.state.paypalShipping === ''
            ? this.setState({ paypalShipping: '' })
            : this.setState({
                paypalShipping: value
              });
        });
        break;
      case 'Grailed':
        this.setState({ grailedShipping: value }, () => {
          this.state.grailedValue === ''
            ? this.setState({ grailedShipping: '' })
            : this.setState({
                grailedShipping: value
              });
        });
        break;
      default:
        console.log('default');
        break;
    }
  };
  toggleCheckBox = (e, type) => {
    switch (type) {
      case 'Paypal':
        this.setState({ paypalCheckbox: !this.state.paypalCheckbox });
        break;
      case 'Grailed':
        this.setState({ grailedCheckbox: !this.state.grailedCheckbox });
        break;
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
                  toggleCheckBox={this.toggleCheckBox}
                  setValue={this.setValue}
                  setShipping={this.setShipping}
                  checkBox={this.state.paypalCheckbox}
                  shippingCost={this.state.paypalShipping}
                  result={this.state.paypalResult}
                  currValue={this.state.paypalValue}
                  type={'Paypal'}
                />
              </CollapsibleItem>
              <CollapsibleItem
                header={<CalculatorHeader name="Grailed" image={Grailed} />}
              >
                <CalculatorInput
                  setValue={this.setValue}
                  setShipping={this.setShipping}
                  result={this.state.grailedResult}
                  toggleCheckBox={this.toggleCheckBox}
                  shippingCost={this.state.grailedShipping}
                  currValue={this.state.grailedValue}
                  checkBox={this.state.grailedCheckbox}
                  type={'Grailed'}
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
