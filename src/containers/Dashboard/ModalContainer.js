import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Modal, Input, Row, Button } from 'react-materialize';
import './Dashboard.css';
import NumberFormat from 'react-number-format';
export class ModalContainer extends Component {
  componentDidMount() {
    console.log('hello');
  }

  componentWillUnmount() {
    console.log('unmount');
    this.props.onResetModal();
  }

  // TODO: add character limit to name
  parseNum = e => {
    console.log(e.key);
    // switch (e.target.name) {
    //   case 'name':
    //     e.target.value === ''
    //       ? this.props.onInValidateField('name')
    //       : this.props.onValidateField({ option: 'name', val: e.target.value });
    //     break;
    //   case 'boughtAt':
    //     if (e.target.value === '') {
    //       this.props.onInValidateField('buy');
    //     } else {
    //       let num = parseFloat(e.target.value);
    //       let cleanNum = num.toFixed(2);
    //       this.props.onValidateField({
    //         option: 'buy',
    //         val: cleanNum
    //       });
    //     }
    //     break;
    //   default:
    // if (e.target.value === '') {
    // this.props.onInValidateField('sell');
    // } else {
    let num = parseFloat(e.target.value);
    let num1 = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(num);
    console.log(num1);
    let cleanNum = num.toFixed(2);
    this.props.onUpdateForm({
      option: e.target.name,
      val: cleanNum
    });
    // }
    // break;
    // }
  };

  preventE = e => {
    if (e.key === 'e') e.preventDefault();
  };

  selectCategory = e => {
    console.log(e.target.id);
  };

  render() {
    return (
      <Modal
        id="Dash-Modal"
        actions={
          <div>
            <Button
              modal="close"
              waves="light"
              onClick={() =>
                this.props.addToList({
                  name: this.props.name,
                  buyPrice: this.props.buyPrice,
                  sellPrice: this.props.sellPrice,
                  sellDate: this.props.sellDate,
                  buyDate: this.props.buyDate
                })
              }
              disabled={
                this.props.name === '' ||
                this.props.buyPrice === '' ||
                this.props.sellPrice === '' ||
                this.props.buyDate === '' ||
                this.props.sellDate === ''
              }
              className="btn-primary"
            >
              Add Item
            </Button>
            <Button flat modal="close" waves="light">
              dismiss
            </Button>
          </div>
        }
        // open={true}
        modalOptions={{
          complete: () => this.props.onResetModal()
        }}
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
              value={this.props.name}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'name',
                  value: e.target.value
                })
              }
            />
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              label="Bought At ($)"
              customInput={Input}
              s={6}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'buyPrice',
                  value: e.target.value
                })
              }
            />
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              label="Sold At ($)"
              customInput={Input}
              s={6}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'sellPrice',
                  value: e.target.value
                })
              }
            />
            <Input
              s={6}
              type="date"
              name="buyDate"
              date={new Date()}
              label="Buy Date"
              options={{
                selectMonths: true,
                selectYears: true,
                defaultDate: null,
                setDefaultDate: true,
                format: 'mm/dd/yyyy',
                max: new Date()
                // onClose: () => {
                //   this.set(select, ['']);
                // }
              }}
              onChange={(e, value) =>
                this.props.onUpdateForm({
                  option: 'buyDate',
                  value: e.target.value.split('/')
                })
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
                defaultDate: null,
                setDefaultDate: true,
                format: 'mm/dd/yyyy',
                min: new Date(
                  this.props.sellDate[0],
                  this.props.sellDate[1],
                  this.props.sellDate[2]
                )
              }}
              onChange={(e, value) =>
                this.props.onUpdateForm({
                  option: 'sellDate',
                  value: e.target.value.split('/')
                })
              }
            />
          </div>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.modal.name,
    buyPrice: state.modal.buyPrice,
    sellPrice: state.modal.sellPrice,
    sellDate: state.modal.sellDate,
    category: state.modal.category,
    validBuy: state.modal.validBuy,
    validSell: state.modal.validSell,
    validName: state.modal.validName,
    validForm: state.modal.validForm,
    buyDate: state.modal.buyDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateForm: input => dispatch(actionCreators.updateForm(input)),
    onValidateField: input => dispatch(actionCreators.validateModal(input)),
    onInValidateField: input => dispatch(actionCreators.invalidateModal(input)),
    onUpdateBuyPrice: input => dispatch(actionCreators.updateBuyPrice(input)),
    onUpdateSellPrice: input => dispatch(actionCreators.updateSellPrice(input)),
    onSetCalendarBuyDate: input =>
      dispatch(actionCreators.setCalendarBuyDate(input)),
    onSetCalendarSellDate: input =>
      dispatch(actionCreators.setCalendarSellDate(input)),
    onSetCategory: input => dispatch(actionCreators.setCategory(input)),
    onResetModal: () => dispatch(actionCreators.resetModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
