import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import SalesList from './components/sales_list';
import TotalReporting from './components/total_reporting';
import BestSeller from './components/best-seller';
import GMap from './components/g_map';
import LineChart from './components/line_chart';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      orderedSales: [],
      sales: [],
      lastSale: '',
      loading: 'inline'
     }
  }

  getDataFromURL(){
    fetch('https://mighty-gumball-api.herokuapp.com/mighty_gumball_api')
    .then(response => response.json())
    .then(sale => {
      this.setArrays(sale);
    });
  }

  orderAsc(a, b) {
  	return b.sales - a.sales;
  }

  generateOrderedSales(array, item, meti){
    let sum = item.sales + meti.sales;
    let i = array.findIndex((e) => {
      return e.name == item.name
    });
    array.splice(i, 1);
    array[i] = {
      name: item.name,
      sales: sum,
      latitude: item.latitude,
      longitude: item.longitude,
      time: item.time
    }
    return array;
  }

  setArrays(sale){
    let bestSeller =[];
    let OGArray = [];
    let myArray = [];

    if(this.state.orderedSales.length > 0){
      myArray = this.state.orderedSales;
      bestSeller = myArray.filter((item, index)=>{
        return item.name === sale.name;
      });
    }
    if(bestSeller.length > 0){
      OGArray = this.generateOrderedSales(myArray, bestSeller[0], sale);
    }
    this.setState({
      lastSale: sale,
      orderedSales: OGArray.length > 0 ? OGArray.sort(this.orderAsc)  : [sale, ...this.state.orderedSales].sort(this.orderAsc),
      sales: [sale, ...this.state.sales],
      loading: 'none'
    });
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.getDataFromURL();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    let {lastSale, sales, loading} = this.state;
    return (
      <div className="container">
        <h3 className="page-title">MightyGumball Inc. <br/><small>California, USA Sales</small></h3>
        <div className="flex-container">
          <TotalReporting sales={sales}/>
          {<BestSeller bSeller={this.state.orderedSales[0] === undefined ? lastSale : this.state.orderedSales[0]} />}
        </div>
        <div className="flex-container">
          <div className="col col-left">
            <LineChart lastSale={lastSale} loading={loading}/>
          </div>
          <div className="col col-right">
            <SalesList sales={sales} loading={loading} />
          </div>
        </div>
        <GMap lastSale={lastSale}/>
      </div>
    );
  }
}

//take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
