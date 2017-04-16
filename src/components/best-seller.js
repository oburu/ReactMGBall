import React, {Component} from 'react';

class BestSeller extends Component {
  constructor(){
    super();

    this.state = {
      address:'Loading address',
      saleSorted: {}
    }
    this.getAddress = this.getAddress.bind(this);
  }

  getAddress(sale){
    var latlng = new google.maps.LatLng(sale.latitude, sale.longitude);
    var geocoder = new google.maps.Geocoder;
    var miAdress = geocoder.geocode({'location': latlng}, (results, status) => {
      if (status === 'OK') {
        if (results[1]) {
          this.setState({address : results[1].formatted_address});
        }
      }
    });
  }

  componentWillReceiveProps(nextProps){
    let mysale = 'Loading';

    if(nextProps.sales.length > 0){
      mysale = nextProps.sales.sort((a, b) => {
      	return b.sales - a.sales;
      });
    }
    this.setState({saleSorted:mysale[0]});
    this.getAddress(mysale[0]);
  }

  render(){
    return (
      <div className="col col-right">
        <h4>Best seller</h4>
        <p>This is the faster selling store in the area.</p>
        <h4 className="best-seller"> <a href="#">{this.state.saleSorted.name} <span className="pull-right">{this.state.saleSorted.sales}</span></a> </h4>
        <p>{this.state.address}</p>
      </div>
    );
  }
}

export default BestSeller;
