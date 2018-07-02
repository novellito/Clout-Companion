import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Modal, Input, Row } from 'react-materialize';
import './Dashboard.css';

export class ModalContainer extends Component {

  //   componentDidMount () {
  //   $('.datepicker').pickadate({
  //     selectMonths: true, // Creates a dropdown to control month
  //     selectYears: 15, // Creates a dropdown of 15 years to control year
  //     onSet: this.handleDateChange // returns { select: dateInMilliseconds }
  //   });
  // }
  validate = e => {
    switch (e.target.name) {
      case 'name':
        e.target.value === ''
          ? this.props.onInValidateField('name')
          : this.props.onValidateField({ option: 'name', val: e.target.value });
        break;
      case 'boughtAt':
        if (e.target.value === '') {
          this.props.onInValidateField('buy');
        } else {
          let num = parseFloat(e.target.value);
          let cleanNum = num.toFixed(2);
          this.props.onValidateField({
            option: 'buy',
            val: cleanNum
          });
        }
        break;
      default:
        if (e.target.value === '') {
          this.props.onInValidateField('sell');
        } else {
          let num = parseFloat(e.target.value);
          let cleanNum = num.toFixed(2);
          this.props.onValidateField({
            option: 'sell',
            val: cleanNum
          });
        }
        break;
    }
  };

  test = e => {
    console.log('test');
  };

  render() {
    return (
      <Modal
        id="Dash-Modal"
        open={true}
        header="Add a New Item"
        trigger={<i className="fa fa-2x fa-plus-circle" />}
      >
        <Row>
          <div className="categories">
            <p>Category:</p>
            <i className="fas fa-2x fa-shoe-prints" />
            <i className="fas fa-2x fa-tshirt" />
            <i className="fas fa-2x fa-glasses" />
            <i className="fas fa-ellipsis-h" />
          </div>
          <div className="item-info">
            <Input
              s={6}
              maxLength="30"
              type="text"
              label="Name"
              name="name"
              onChange={e => this.validate(e)}
            />
            <Input
              s={6}
              type="number"
              name="boughtAt"
              step="0.01"
              label="Bought At ($)"
              value={this.props.buyPrice}
              onChange={e => this.props.onUpdateBuyPrice(e.target.value)}
              onBlur={e => this.validate(e)}
            />
            <Input
              s={6}
              type="number"
              name="soldAt"
              label="Sold At ($)"
              value={this.props.sellPrice}
              onChange={e => this.props.onUpdateSellPrice(e.target.value)}
              onBlur={e => this.validate(e)}
            />
        
            <Input
              s={6}
              showClearBtn={false}
              type="date"
              name="buyDate"
              label="Buy Date"
              options={{selectMonths:true,selectYears:true, min: new Date(2015,3,20),max: new Date(2018,8,14)}}
              onChange={(e, value) => this.props.onSetCalendarBuyDate(value)}
            />
            <Input
              s={6}
              type="date"
              name="sellDate"
              label="Sell Date"
              options={{selectMonths:true,selectYears:true, min: new Date(2015,3,20),max: new Date(2018,8,14)}}
              onChange={(e, value) => this.props.onSetCalendarSellDate(value)}
            />
          </div>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    buyPrice: state.modal.buyPrice,
    sellPrice: state.modal.sellPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onValidateField: input => dispatch(actionCreators.validateModal(input)),
    onInValidateField: input => dispatch(actionCreators.invalidateModal(input)),
    onUpdateBuyPrice: input => dispatch(actionCreators.updateBuyPrice(input)),
    onUpdateSellPrice: input => dispatch(actionCreators.updateSellPrice(input)),
    onSetCalendarBuyDate: input =>
      dispatch(actionCreators.setCalendarBuyDate(input)),
    onSetCalendarSellDate: input =>
      dispatch(actionCreators.setCalendarSellDate(input))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
