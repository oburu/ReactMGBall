import React from 'react';

const TotalReporting = (props) =>{
  let totalSales = {sales:0};
  let price = 1.65;

  if(props.sales.length > 0){
    totalSales = props.sales.reduce((a, b) => {
      return {sales: a.sales + b.sales}
    });
  }
  return (
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
  );
}

export default TotalReporting;
