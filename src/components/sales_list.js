import React, { Component } from 'react';
import SalesListItem from './sales_list_item';

export default class SalesList extends Component {
  constructor(props){
    super(props);

  }

  render(){
    const salesItems = this.props.sales.map((sale, i) => {
      return (
        <SalesListItem key={i} sale={sale}/>
      );
    });
    let style = {
      display: this.props.loading
    };
    return(
      <div className="total-sales-panel">
        <h4>Total Sales</h4>
        <p style={style} className="lead">Fetching data from API...</p>
        <div className="list-group">
            { salesItems }
        </div>
      </div>
    );
  }

}
