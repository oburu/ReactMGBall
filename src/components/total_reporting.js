import React, {Component} from 'react';
import BestSeller from './best-seller';

export default class TotalReporting extends Component {
  render(){
    let totalSales = {sales:0};
    let price = 1.65;
    let bestSeller = {};

    if(this.props.sales.length > 0){
      bestSeller = this.props.sales[0];
      totalSales = this.props.sales.reduce((a, b) => {
        return {sales: a.sales + b.sales}
      });

    }

    return (
      <div className="flex-container">
        <div className="col col-left">
          <h4>Total reporting</h4>
          <p>Report of gum sold in the state of California, USA. All this data is coming from a sleepy RESTful api. </p>
          <div className="row">
            <div className="col-sm-6">
              <h5>Money Income (Price: £ {price} each)</h5>
              <h1>£ {(totalSales.sales * price).toFixed(2)}</h1>
            </div>
            <div className="col-sm-6">
              <h5>Amount Sold</h5>
              <h1> {totalSales.sales} </h1>
            </div>
          </div>
        </div>
        <BestSeller bSeller={bestSeller} />
      </div>
    )
  }

}
