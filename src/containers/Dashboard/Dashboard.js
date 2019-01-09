import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Table } from 'react-materialize';
import './Dashboard.css';
import ModalContainer from './ModalContainer';
import * as actionCreators from '../../store/actions/actionCreators';
import axios from 'axios';
import { Line } from 'react-chartjs';
var a = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
var data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};
export class Dashboard extends Component {
  state = {
    items: [],
    foo: false
  };

  componentDidMount() {
    axios
      .get(`/api/user/${this.props.uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(({ data }) => {
        this.setState({ items: data });
      })
      .catch(err => console.log(err));
  }

  addItemToList = async item => {
    try {
      const { data } = await axios.post(
        '/api/user',
        { item, userId: this.props.uid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      );
      this.setState({ items: [...this.state.items, data] });
    } catch (err) {
      console.log(err);
    }
  };

  deleteItem = async () => {
    try {
      await axios.delete(' /api/user/deleteItem', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        data: {
          userId: this.props.uid,
          itemId: this.state.items[this.props.editingIndex]._id
        }
      });

      const newItems = [...this.state.items];
      newItems.splice(this.props.editingIndex, 1);
      this.setState({
        items: newItems
      });
      this.props.cleanupItems(); // reset all the fields
    } catch (err) {
      console.log(err);
    }
  };

  updateItem = async (item, index) => {
    try {
      await axios.put(
        '/api/user/updateItem',
        { payload: item, id: this.state.items[index]._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        }
      );
      const newItems = [...this.state.items];
      newItems[index] = item;
      this.setState({
        items: newItems
      });
    } catch (err) {
      console.log(err);
    }
  };

  test = () => {
    this.setState({ foo: true });
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
                <Line data={data} width="600" height="250" />
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
                {this.state.foo ? (
                  <ModalContainer
                    // active={true}
                    addToList={this.addItemToList}
                    updateItem={(item, index) => this.updateItem(item, index)}
                    // trigger={
                    //   this.props.editingIndex ||
                    //   this.props.editingIndex === 0 ? (
                    //     <i
                    //       className="fa fa-2x fa-edit"
                    //       // onClick={() => this.forceUpdate()}
                    //     />
                    //   ) : (
                    //     <i className="fa fa-2x fa-plus-circle" />
                    //   )
                    // }
                  />
                ) : (
                  ''
                )}
                {this.props.editingIndex || this.props.editingIndex === 0 ? (
                  <i className="fa fa-2x fa-trash" onClick={this.deleteItem} />
                ) : (
                  ''
                )}
                <i className="fa fa-2x fa-edit" onClick={() => this.test()} />
                <i
                  className="fa fa-2x fa-download"
                  onClick={() => this.test()}
                />
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
