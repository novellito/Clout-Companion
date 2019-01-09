import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Modal, Input, Row, Button } from 'react-materialize';
import './Dashboard.css';
import NumberFormat from 'react-number-format';
console.log(Input);
export class ModalContainer extends Component {
  componentWillUnmount() {
    this.props.onResetModal();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
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
        open={true}
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
                      buyDate,
                      category
                    })
                  : this.props.updateItem(
                      {
                        name,
                        buyPrice,
                        sellPrice,
                        sellDate,
                        buyDate,
                        category
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
              {this.props.editingIndex || this.props.editingIndex === 0
                ? 'Update Item'
                : 'Add Item'}
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
        // trigger={trigger}
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
              label="Name"
              name="name"
              labelClassName={name ? 'active' : ''}
              defaultValue={name ? name : ''}
              // defaultValue={name}
              // value={name ? name : ''}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'name',
                  value: e.target.value
                })
              }
            />
            <Input
              s={6}
              type="number"
              label="buyPrice"
              name="buyPrice"
              labelClassName={buyPrice ? 'active' : ''}
              // defaultValue={
              //   buyPrice ? parseFloat(buyPrice).toLocaleString('en') : ''
              // }
              // defaultValue={name}
              value={buyPrice ? buyPrice : ''}
              // value={buyPrice ? parseFloat(buyPrice).toLocaleString('en') : ''}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'buyPrice',
                  value: e.target.value
                })
              }
            />
            {/* <NumberFormat
              thousandSeparator={true}
              name="buyPrice"
              decimalScale={2}
              label="Bought At ($)"
              // labelClassName={buyPrice ? 'active' : ''}
              customInput={Input}
              // customInput={Input}
              // defaultValue={''}
              defaultValue={buyPrice ? buyPrice : ''}
              value={buyPrice ? buyPrice : ''}
              s={6}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'buyPrice',
                  value: e.target.value
                })
              }
            /> */}
            {/* <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              label="Sold At ($)"
              labelClassName={sellPrice ? 'active' : ''}
              customInput={Input}
              s={6}
              defaultValue={sellPrice ? sellPrice : ''}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'sellPrice',
                  value: e.target.value
                })
              }
            /> */}
            {buyDate.length > 0 ? <React.Fragment /> : ''}
            {/* <Input
              s={6}
              type="date"
              name="buyDate"
              label="Buy Date"
              // value={new Date()}
              options={{
                selectMonths: true,
                selectYears: true,
                setDefaultDate: true,
                // defaultDate: new Date(buyDate[0], buyDate[1], buyDate[2]),
                onStart: function() {
                  console.log(buyDate);

                  this.set(
                    'select',
                    new Date(buyDate[2], buyDate[0], buyDate[1])
                  );
                },
                format: 'mm/dd/yyyy',
                max: new Date()
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
              options={{
                selectMonths: true,
                selectYears: true,
                // onStart: function() {
                //   this.set(
                //     'select',
                //     new Date(sellDate[0], sellDate[1], sellDate[2])
                //   );
                // },
                format: 'mm/dd/yyyy',
                min: new Date(sellDate[0], sellDate[1], sellDate[2])
              }}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'sellDate',
                  value: e.target.value.split('/')
                })
              }
            /> */}
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
