import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Table } from 'react-materialize';
import './Dashboard.css';
import axios from 'axios';
import ModalContainer from './ModalContainer';
export class Dashboard extends Component {
  state = {
    items: []
  };

  addItemToList = item => {
    console.log('hello');
  };

  componentDidMount() {
    if (localStorage.length === 0) {
      this.props.history.replace('/');
    } else {
      // user is accessing dashboard via the token in storage
      // TODO: == get userinfo and store to redux state (later on)
      if (!this.props.isLog) {
        this.relog();
      }
    }
  }

  // function to check whether user's token is valid and redirect them to login page if it isn't
  relog = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    };
    axios
      .post('http://localhost:5000/api/login/authorize', null, { headers })
      .then(res => console.log(res))
      .catch(err => {
        // The token is invalid - make the user login again
        this.props.onRelog();
        this.props.history.replace('/login');
      });
  };

  addItem = () => {
    console.log('adding');
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
                        <th data-field="buy-price">Buy Price</th>
                        <th data-field="sell-price">Sell Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* {this.state.items.map(item=> {
                          <tr>
                          <td>{item.name}</td>
                          <td>{item.buyPrice}</td>
                          <td>{item.sellPrice}</td>
                        </tr> 
                      })} */}
                      <tr>
                        <td>Alvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                      </tr>
                      <tr>
                        <td>Alan</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="card-action item-opts">
                <i className="fa fa-2x fa-download" />
                <i className="fa fa-2x fa-edit" />

                <ModalContainer addToList={this.addItemToList} />
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
    uid: state.login.userId
    //modal info here
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
    onRelog: () => dispatch(actionCreators.relog())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
