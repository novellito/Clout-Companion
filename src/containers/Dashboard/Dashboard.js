import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Table } from 'react-materialize';
import './Dashboard.css';
import ModalContainer from './ModalContainer';
import * as actionCreators from '../../store/actions/actionCreators';
import axios from 'axios';

export class Dashboard extends Component {
  state = {
    items: []
    // items: [
    //   {
    //     category: 'clothes',
    //     name: 'poop',
    //     buyPrice: '300',
    //     sellPrice: '400',
    //     buyDate: ['12', '17', '2018'],
    //     sellDate: ['12', '20', '2018']
    //   }
    // ]
    // editing: false
  };

  componentDidMount() {
    axios
      .get(`/api/user/${this.props.uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({ items: data.items });
      })
      .catch(err => console.log(err));
  }

  addItemToList = async item => {
    try {
      await axios.post(
        '/api/user',
        { item, userId: this.props.uid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      );
      this.setState({ items: [...this.state.items, item] });
    } catch (err) {
      console.log(err);
    }
  };

  deleteItem = () => {
    console.log(this.props.editingIndex);
    const newItems = this.state.items;
    newItems.splice(this.props.editingIndex, 1);
    this.setState({
      items: newItems
    });
    this.props.cleanupItems(); // reset all the fields
  };

  updateItem = (item, index) => {
    const newItems = this.state.items;
    newItems[index] = item;
    this.setState({
      items: newItems
    });
  };

  render() {
    return (
      <div>
        <AppNavbar history={this.props.history} />
        <h1 className="comp-title dash">Dashboard</h1>
        <div className="wrapper">
          <div className="box chart">
            <div className="card dash-card">
              <div className="card-content white-text">
                <span className="card-title">Graph</span>
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
            </div>
          </div>
          <div className="box item-list">
            <div className="card dash-card">
              <div className="card-content items white-text">
                <div className="card-title">My Items</div>
                <div className="card-inner">
                  <Table>
                    <thead>
                      <tr>
                        <th data-field="id">Item</th>
                        <th data-field="buy-price">Buy Price ($)</th>
                        <th data-field="sell-price">Sell Price ($)</th>
                        <th data-field="item-profit">Item Profit ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() =>
                            this.props.onSetEditingItem(item, index)
                          }
                          className="item"
                        >
                          <td>{item.name}</td>
                          <td>{item.buyPrice}</td>
                          <td>{item.sellPrice}</td>
                          <td>
                            {parseFloat(item.sellPrice.replace(/,/g, '')) -
                              parseFloat(item.buyPrice.replace(/,/g, ''))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="card-action item-opts">
                <div className="net-profit h3">
                  Net Profit:{' '}
                  {this.state.items.length > 0 &&
                    this.state.items
                      .map(
                        elem =>
                          parseFloat(elem.sellPrice.replace(/,/g, '')) -
                          parseFloat(elem.buyPrice.replace(/,/g, ''))
                      )
                      .reduce((acc, cv) => acc + cv, 0)}
                </div>
                <ModalContainer
                  addToList={this.addItemToList}
                  updateItem={(item, index) => this.updateItem(item, index)}
                  trigger={
                    this.props.editingIndex || this.props.editingIndex === 0 ? (
                      <i className="fa fa-2x fa-edit" />
                    ) : (
                      <i className="fa fa-2x fa-plus-circle" />
                    )
                  }
                />
                {this.props.editingIndex || this.props.editingIndex === 0 ? (
                  <i className="fa fa-2x fa-trash" onClick={this.deleteItem} />
                ) : (
                  ''
                )}
                <i className="fa fa-2x fa-download" />
              </div>
            </div>
          </div>
          <div className="box notes">
            <div className="card  dash-card">
              <div className="card-content white-text">
                <span className="card-title">Notes</span>
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLog: state.login.isLoggedIn,
    uid: state.login.userId,
    editingIndex: state.modal.editingIndex
  };
};
const mapDispatchToProps = dispatch => {
  return {
    cleanupItems: () => dispatch(actionCreators.resetModal()),
    onSetEditingItem: (input, index) =>
      dispatch(actionCreators.setItemToEdit(input, index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
