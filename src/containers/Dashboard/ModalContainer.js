import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Modal, Input, Row } from 'react-materialize';
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
        e.target.value === ''
          ? this.props.onInValidateField('buy')
          : this.props.onValidateField({ option: 'buy', val: e.target.value });
        break;
      default:
        e.target.value === ''
          ? this.props.onInValidateField('sell')
          : this.props.onValidateField({ option: 'sell', val: e.target.value });
        break;
    }
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
              min="0"
              name="boughtAt"
              label="Bought At ($)"
              onChange={e => this.validate(e)}
            />
            <Input
              s={6}
              type="number"
              min="0"
              name="soldAt"
              label="Sold At ($)"
              onChange={e => this.validate(e)}
            />
          </div>
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLog: state.modal.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onValidateField: input => dispatch(actionCreators.validateModal(input)),
    onInValidateField: input => dispatch(actionCreators.invalidateModal(input))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
