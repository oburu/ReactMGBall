import React, {Component} from 'react';

class TotalReporting extends Component {
  render(){
    let totalSales = {sales:0};
    let price = 1.65;

    if(this.props.sales.length > 0){
      totalSales = this.props.sales.reduce((a, b) => {
        return {sales: a.sales + b.sales}
      });
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="col-xs-12">
            <h4>Total Reporting</h4>
            <p>Report of gum sold in the state of California, USA. All this data is coming from a sleepy RESTful api. </p>
          </div>
          <div className="col-xs-6">
            <h5>Money Income (Price: £ {price} each)</h5>
            <h1>£ {(totalSales.sales * price).toFixed(2)}</h1>
          </div>
          <div className="col-xs-6">
            <h5>Amount Sold</h5>
            <h1> {totalSales.sales} </h1>
          </div>
        </div>
      </div>
    );
  }

}

export default TotalReporting;
