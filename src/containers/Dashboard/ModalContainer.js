import React, { Component } from 'react';
import { Modal, Input, Row } from 'react-materialize';
import './Dashboard.css';

export default class ModalContainer extends Component {
  state = {
    temp: ''
  };
  validateName = e => {
    this.setState({ temp: e.target.value });
  };

  validatePrice = e => {
    console.log(e.target);
    this.setState({ temp: e.target.value });
    console.log('validate price');
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
              label="Name"
              onChange={e => this.validateName(e)}
              value={this.state.temp}
            />
            <Input
              s={6}
              label="Bought At"
              onChange={e => this.validatePrice(e)}
            />
          </div>
        </Row>
      </Modal>
    );
  }
}
