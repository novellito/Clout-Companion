import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { Table, Button } from 'react-materialize';
import './Dashboard.css';
import ModalContainer from './ModalContainer';
import * as actionCreators from '../../store/actions/actionCreators';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { getChartData, defaultDataStyles, getDataPoint } from './ChartLogic';

var a = {
  responsive: true,

  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'value'
        },
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
// will be years
const dataset = {
  // label: 'My First dataset',
  ...defaultDataStyles,
  data: []
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// var currentChart = {
//   labels,
//   datasets: [dataset]
//   // datasets: [defaultDataStyles]
// };
export class Dashboard extends Component {
  state = {
    items: [],
    chartData: null,
    currentYear: '2019',
    currentChart: {
      labels
      // datasets: [dataset]
      // datasets: [defaultDataStyles]
    },
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
        // default chart to 2019
        const defaultData = getChartData(data);
        dataset.data = getDataPoint(defaultData['2019']);
        this.setState({
          items: data,
          chartData: getChartData(data),
          currentChart: { ...this.state.currentChart, datasets: [dataset] }
        });
        // this.setState({ items: data, chartData: currentChart });
      })
      .catch(err => console.log(err));
  }

  addItemToList = async item => {
    // will probably recalcualte chart here
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

  // loadData = () => {
  //   console.log(data);
  //   data = {
  //     ...data
  //     // datasets: []
  //   };
  //   console.log(data);
  //   return data;
  // };

  test = () => {
    this.setState({ foo: true });
  };

  changeYear = (left = true) => {
    let data = { ...this.state.currentChart };
    if (left) {
      // go to prev year
      const yrs = Object.keys(this.state.chartData);

      if (yrs.indexOf(this.state.currentYear) - 1 !== -1) {
        // if the item to the left exists pick it
        const currentYear = yrs[yrs.indexOf(this.state.currentYear) - 1];
        data.datasets[0].data = getDataPoint(this.state.chartData[currentYear]);
        this.setState({ currentChart: data, currentYear });
      } else {
        // at the beginning so chose the end
        const currentYear = yrs[yrs.length - 1];

        data.datasets[0].data = getDataPoint(
          this.state.chartData[yrs[yrs.length - 1]]
        );
        this.setState({ currentChart: data, currentYear });
      }
    } else {
      // go to next year
      const yrs = Object.keys(this.state.chartData);

      if (yrs[yrs.indexOf(this.state.currentYear) + 1]) {
        // if the item to the left exists pick it
        const currentYear = yrs[yrs.indexOf(this.state.currentYear) + 1];
        data.datasets[0].data = getDataPoint(this.state.chartData[currentYear]);
        this.setState({ currentChart: data, currentYear });
      } else {
        // at the beginning so chose the end
        const currentYear = yrs[0];

        data.datasets[0].data = getDataPoint(this.state.chartData[yrs[0]]);
        this.setState({ currentChart: data, currentYear });
      }
    }
    // getDataPoint(this.state.chartData['2019']);
    // data.datasets[0].data = getDataPoint(this.state.chartData['2018']);
    // this.setState({ currentChart: data });
    console.log(dataset);
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
                {this.state.items.length === 0 ? (
                  'loading...'
                ) : (
                  <Line
                    options={a}
                    // options={{ scaleGridLineColor: 'red' }}
                    data={this.state.currentChart}

                    // width="600"
                    // height="2new Date(50"
                  />
                )}
                <i
                  className="fa fa-2x fa-chevron-left"
                  onClick={this.changeYear}
                />
                <Button onClick={this.changeYear}>Toggle</Button>
                <i
                  className="fa fa-2x fa-chevron-right"
                  onClick={() => this.changeYear(false)}
                />
                {this.state.currentYear}
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
                    trigger={
                      this.props.editingIndex ||
                      this.props.editingIndex === 0 ? (
                        <i
                          className="fa fa-2x fa-edit"
                          // onClick={() => this.forceUpdate()}
                        />
                      ) : (
                        <i className="fa fa-2x fa-plus-circle" />
                      )
                    }
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
