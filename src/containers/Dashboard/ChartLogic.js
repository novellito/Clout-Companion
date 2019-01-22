const defaultDataStyles = {
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10
};
export const labels = [
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

export const dataset = {
  ...defaultDataStyles,
  data: []
};

export const chartOptions = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Net Profit'
        },
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
export const getChartData = (items, yearSelected = '2018') => {
  let calendarMap = {};

  items.forEach(elem => {
    if (!calendarMap[elem.sellDate[2]]) {
      // new year
      calendarMap[elem.sellDate[2]] = {
        [elem.sellDate[0]]: {
          count: 1,
          netProfit: [
            parseFloat(elem.sellPrice.replace(/,/g, '')) -
              parseFloat(elem.buyPrice.replace(/,/g, ''))
          ]
        }
      };
    } else {
      // need to check if it has the month
      if ([elem.sellDate[0]] in calendarMap[elem.sellDate[2]]) {
        // the month is there already
        calendarMap[elem.sellDate[2]][elem.sellDate[0]].count =
          calendarMap[elem.sellDate[2]][elem.sellDate[0]].count + 1; // increment count

        calendarMap[elem.sellDate[2]][elem.sellDate[0]].netProfit = [
          // add the new profit in
          ...calendarMap[elem.sellDate[2]][elem.sellDate[0]].netProfit,
          parseFloat(elem.sellPrice.replace(/,/g, '')) -
            parseFloat(elem.buyPrice.replace(/,/g, ''))
        ];
      } else {
        // add it for the first time
        calendarMap[elem.sellDate[2]][elem.sellDate[0]] = {
          count: 1,
          netProfit: [
            parseFloat(elem.sellPrice.replace(/,/g, '')) -
              parseFloat(elem.buyPrice.replace(/,/g, ''))
          ]
        };
      }
    }
  });

  return calendarMap;
};

export const getDataPoint = calendarMap => {
  let data = []; // to be the data point in the chart
  for (let i = 0; i <= 11; i++) {
    if (Object.keys(calendarMap)[i]) {
      data[parseFloat(Object.keys(calendarMap)[i]) - 1] = calendarMap[
        Object.keys(calendarMap)[i]
      ].netProfit.reduce((a, b) => a + b, 0);
    }
  }

  for (let i = 0; i <= 11; i++) {
    if (!data[i]) {
      data[i] = 0;
    }
  }

  return data;
};
