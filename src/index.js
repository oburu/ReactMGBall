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
      this.setState({
        lastSale: sale,
        sales: [sale, ...this.state.sales],
        loading: 'none'
      });
      this.setOrderedSales(sale);
    });
  }

  orderAsc(a, b) {
  	return b.sales - a.sales;
  }

  setOrderedSales(sale){
    let bestSeller =[];
    if(this.state.orderedSales.length > 0){
      bestSeller = this.state.orderedSales.filter((item,index)=>{
        if(index > 0){
          return item.name === this.state.sales[0].name;
        }
      });
    }
    if(bestSeller.length > 0){
      const newSeller = (item, meti) =>{
        let sum = item.sales + meti.sales
        return {
          name: item.name,
          sales: sum,
          laitude: item.latitude,
          longitude: item.longitude
        }
      }
      this.setState({
        orderedSales: [ ...this.state.orderedSales, newSeller(bestSeller[0],this.state.sales[0])].sort(this.orderAsc)
      })
    }else{
      this.setState({
        orderedSales: [ ...this.state.orderedSales, sale].sort(this.orderAsc)
      })
    }
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
          <BestSeller bSeller={this.state.orderedSales[0] === undefined ? lastSale : this.state.orderedSales[0]} />
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
