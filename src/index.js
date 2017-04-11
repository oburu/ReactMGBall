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

  getDataFromURL(){
    const MGB_URL = 'https://mighty-gumball-api.herokuapp.com/mighty_gumball_api';
    fetch(MGB_URL)
      .then( response => response.json() )
      .then(sale => {
        console.log(sale);
        this.setState({
          sales: [...this.state.sales, sale]
        });
      } );
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.getDataFromURL();
    }, 2000);
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
