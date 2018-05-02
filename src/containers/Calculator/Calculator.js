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
    grailedValue: '',
    grailedResult: ''
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
                  setValue={this.setValue}
                  result={this.state.paypalResult}
                  type={'Paypal'}
                />
              </CollapsibleItem>
              <CollapsibleItem
                header={<CalculatorHeader name="Grailed" image={Grailed} />}
              >
                <CalculatorInput
                  setValue={this.setValue}
                  result={this.state.grailedResult}
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
