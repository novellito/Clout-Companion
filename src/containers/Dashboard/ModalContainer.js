import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Modal, Input, Row, Button } from 'react-materialize';
import './Dashboard.css';
import NumberFormat from 'react-number-format';
export class ModalContainer extends Component {
  componentWillUnmount() {
    this.props.onResetModal();
  }

  render() {
    const {
      name,
      buyPrice,
      sellPrice,
      sellDate,
      buyDate,
      trigger,
      category
    } = this.props;

    return (
      <Modal
        id="Dash-Modal"
        actions={
          <div>
            <Button
              modal="close"
              waves="light"
              onClick={() =>
                !this.props.editingIndex && this.props.editingIndex !== 0
                  ? this.props.addToList({
                      name,
                      buyPrice,
                      sellPrice,
                      sellDate,
                      buyDate
                    })
                  : this.props.updateItem(
                      {
                        name,
                        buyPrice,
                        sellPrice,
                        sellDate,
                        buyDate
                      },
                      this.props.editingIndex
                    )
              }
              disabled={
                name === '' ||
                buyPrice === '' ||
                sellPrice === '' ||
                buyDate === '' ||
                sellDate === ''
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
        modalOptions={{
          complete: () => this.props.onResetModal()
        }}
        header="Add a New Item"
        trigger={trigger}
      >
        <Row>
          <div className="categories">
            <p>Category: {category}</p>
            <i
              style={{
                color: category === 'shoes' ? '#ff3547b3' : 'white'
              }}
              onClick={e => this.props.onSetCategory(e.target.id)}
              id="shoes"
              className="fas shoes fa-3x fa-shoe-prints"
            />
            <i
              style={{
                color: category === 'clothes' ? '#ff3547b3' : 'white'
              }}
              onClick={e => this.props.onSetCategory(e.target.id)}
              id="clothes"
              className="fas fa-3x fa-tshirt"
            />
            <i
              style={{
                color: category === 'accessories' ? '#ff3547b3' : 'white'
              }}
              onClick={e => this.props.onSetCategory(e.target.id)}
              id="accessories"
              className="fas fa-3x fa-glasses"
            />
            <i
              style={{
                color: category === 'other' ? '#ff3547b3' : 'white'
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
              placeholder={name ? name : null}
              label="Name"
              name="name"
              value={name}
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
              value={buyPrice}
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
              value={sellPrice}
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
              // value={new Date(buyDate[0], buyDate[1], buyDate[2])}
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
              onChange={e =>
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
              // value={new Date(sellDate[0], sellDate[1], sellDate[2])}
              options={{
                selectMonths: true,
                selectYears: true,
                defaultDate: null,
                setDefaultDate: true,
                format: 'mm/dd/yyyy'
                // min: new Date(sellDate[0], sellDate[1], sellDate[2])
              }}
              onChange={e =>
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
    buyDate: state.modal.buyDate,
    sellDate: state.modal.sellDate,
    category: state.modal.category,
    editingIndex: state.modal.editingIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateForm: input => dispatch(actionCreators.updateForm(input)),
    onSetCategory: input => dispatch(actionCreators.setCategory(input)),
    onResetModal: () => dispatch(actionCreators.resetModal()),
    onSetEditingItem: input => dispatch(actionCreators.setItemToEdit(input))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
