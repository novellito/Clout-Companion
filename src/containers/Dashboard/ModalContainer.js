import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Modal, Input, Row, Button } from 'react-materialize';
import './Dashboard.css';

export class ModalContainer extends Component {
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

  selectCategory = e => {
    console.log(e.target.id);
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
            <p>Category: {this.props.category}</p>
            <i
              style={{
                color: this.props.category === 'shoes' ? '#ff3547b3' : 'white'
              }}
              onClick={e => this.props.onSetCategory(e.target.id)}
              id="shoes"
              className="fas shoes fa-3x fa-shoe-prints"
            />
            <i
              style={{
                color: this.props.category === 'clothes' ? '#ff3547b3' : 'white'
              }}
              onClick={e => this.props.onSetCategory(e.target.id)}
              id="clothes"
              className="fas fa-3x fa-tshirt"
            />
            <i
              style={{
                color:
                  this.props.category === 'accessories' ? '#ff3547b3' : 'white'
              }}
              onClick={e => this.props.onSetCategory(e.target.id)}
              id="accessories"
              className="fas fa-3x fa-glasses"
            />
            <i
              style={{
                color: this.props.category === 'other' ? '#ff3547b3' : 'white'
              }}
              onClick={e => this.props.onSetCategory(e.target.id)}
              id="other"
              className="fas fa-3x fa-ellipsis-h"
            />
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
              type="date"
              name="buyDate"
              label="Buy Date"
              options={{
                selectMonths: true,
                selectYears: true,
                format: 'mm/dd/yyyy',
                max: new Date()
              }}
              onChange={(e, value) =>
                this.props.onSetCalendarBuyDate(value.split('/'))
              }
            />
            <Input
              s={6}
              type="date"
              name="sellDate"
              label="Sell Date"
              options={{
                selectMonths: true,
                selectYears: true,
                format: 'mm/dd/yyyy',
                min: new Date(
                  this.props.sellDate[0],
                  this.props.sellDate[1],
                  this.props.sellDate[2]
                )
              }}
              onChange={(e, value) =>
                this.props.onSetCalendarSellDate(value.split('/'))
              }
            />
            <Button className="item-submit-btn btn-primary" waves="light">
              Add Item
            </Button>
          </div>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    buyPrice: state.modal.buyPrice,
    sellPrice: state.modal.sellPrice,
    sellDate: state.modal.sellDate,
    category: state.modal.category
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
      dispatch(actionCreators.setCalendarSellDate(input)),
    onSetCategory: input => dispatch(actionCreators.setCategory(input))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
