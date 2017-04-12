import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import SalesList from './components/sales_list';
import TotalReporting from './components/total_reporting';

//Class base component
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      sales: [],
      loading: 'inline'
     }
  }

  getDataFromURL(){
    fetch('https://mighty-gumball-api.herokuapp.com/mighty_gumball_api')
    .then(response => response.json())
    .then(sale => {
      this.setState({
        sales: [sale, ...this.state.sales],
        loading: 'none'
      });
    });
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.getDataFromURL();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    let {sales, loading} = this.state;
    return (
      <div className="container">
        <h3 className="page-title">MightyGumball Inc. <small>California Sales</small></h3>
        <TotalReporting sales={sales} />
        <SalesList sales={sales} loading={loading} />
      </div>
    );
  }
}

//take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
