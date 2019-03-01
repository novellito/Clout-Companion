import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Modal, Input, Row, Button } from 'react-materialize';
import './Dashboard.css';
import NumberFormat from 'react-number-format';
import Categories from './Categories';
export class ModalContainer extends Component {
  componentWillUnmount() {
    this.props.toggleModal();
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
      category,
      editingIndex
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
                !editingIndex && editingIndex !== 0
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
                      editingIndex
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
              {editingIndex || editingIndex === 0 ? 'Update Item' : 'Add Item'}
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
      >
        <Row>
          <Categories click={this.props.onSetCategory} category={category} />
          <div className="item-info">
            <Input
              s={6}
              maxLength="30"
              label="Name"
              name="name"
              labelClassName={name ? 'active' : ''}
              defaultValue={name ? name : ''}
              onChange={e =>
                this.props.onUpdateForm({
                  option: 'name',
                  value: e.target.value
                })
              }
            />
            <NumberFormat
              thousandSeparator={true}
              name="buyPrice"
              decimalScale={2}
              label="Bought At ($)"
              labelClassName={buyPrice ? 'active' : ''}
              customInput={Input}
              value={buyPrice ? buyPrice : ''}
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
              labelClassName={sellPrice ? 'active' : ''}
              customInput={Input}
              s={6}
              value={sellPrice ? sellPrice : ''}
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
              label="Buy Date"
              options={{
                selectMonths: true,
                selectYears: true,
                setDefaultDate: true,
                onStart: function() {
                  if (buyDate.length === 3)
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
                format: 'mm/dd/yyyy',
                onStart: function() {
                  if (sellDate.length === 3)
                    this.set(
                      'select',
                      new Date(sellDate[2], sellDate[0], sellDate[1])
                    );
                },
                min: new Date(sellDate[0], sellDate[1], sellDate[2])
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
