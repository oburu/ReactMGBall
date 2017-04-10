import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import SalesList from './components/sales_list';

//Class base component
class App extends Component {
  constructor(props){
    super(props);

    this.state = { sales: [] }
  }

  getDataFromURL(url){
    fetchJsonp(url)
    .then(response => response.json())
    .then(sales => {
      let longitud = this.state.sales.length;
      if(this.state.sales[longitud-1]){
        if(this.state.sales[longitud-1].time !== sales[1].time){
          this.setState({
            sales: [...this.state.sales, sales[1]]
          });
        }
      } else {
        this.setState({
          sales: [...this.state.sales, sales[1]]
        });
      }
    });
  }

  componentDidMount() {
    const MIGHTY_URL = '//gumball.wickedlysmart.com';
    this._interval = setInterval(() => {
      this.getDataFromURL(MIGHTY_URL);
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    let sales = this.state.sales;
    return (
      <div className="container">
        <h3 className="page-title">Mighty gumball inc. <small>California Sales</small></h3>
        <SalesList sales={this.state.sales} />
      </div>
    );
  }
}

//take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
