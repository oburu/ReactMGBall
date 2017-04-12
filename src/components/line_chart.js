import React, {Component} from 'react';
import Chart from 'chart.js'

export default class LineChart extends Component {

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    let data = this.myLineChart.data.labels.length;
    this.myLineChart.data.datasets[0].data[data] = nextProps.lastSale.sales;
    this.myLineChart.data.labels[data] = nextProps.lastSale.name;
    this.myLineChart.update();
  }

  componentDidMount(){
    var config = {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
            label: "Sales",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: []
        }]
      },
      options: {
        responsive: true,
    		maintainAspectRatio: false,
    		scales: {
    			yAxes: [{
    					display: true,
    					ticks: {
    						beginAtZero: true,
    						steps: 1,
    						stepValue: 1,
    						max: 10
    					}
    				}],
    			xAxes: [{
    				ticks: {
    					maxRotation: 0 // angle in degrees
    				}
    			}]
    		},
        legend: {
        	display: false
        },
      	tooltips: {
        	callbacks: {
          	label: function(tooltipItem) {
            	return tooltipItem.yLabel;
            }
          }
        }
      }
    };
    this.myLineChart = new Chart(this.refs.lineChart, config);
  }
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-body">
        <h4>Live updates</h4>
          <canvas ref="lineChart" width="400" height="200"></canvas>
        </div>
      </div>
    );
  }
}
