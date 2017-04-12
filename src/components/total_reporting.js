import React from 'react';

const TotalReporting = (props) => {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <div className="col-xs-12">
          <h4>Total Reporting</h4>
          <p>Report of gum sold in the state of California, USA. All this data is coming from a sleepy RESTful api. </p>
        </div>
        <div className="col-xs-6">
          <h5>Money Income</h5>
          <h1>£ 345.00 </h1>
        </div>
        <div className="col-xs-6">
          <h5>Amount Sold</h5>
          <h1> 654 </h1>
        </div>
      </div>
    </div>
  )
}

export default TotalReporting;
