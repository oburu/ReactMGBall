import React, {Component} from 'react';

class BestSeller extends Component {
  constructor(){
    super();

    this.state = {
      address:'Loading data...',
      best: {
        name:'Loading data...',
        sales: '--'
      }
    }
    this.getAddress = this.getAddress.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      best: {
        name:nextProps.bSeller.name,
        sales: nextProps.bSeller.sales
      }
    });
    this.getAddress(nextProps.bSeller.latitude, nextProps.bSeller.longitude)
  }

  getAddress(latitude, longitude){
    var latlng = new google.maps.LatLng(latitude, longitude);
    var geocoder = new google.maps.Geocoder;
    var miAdress = geocoder.geocode({'location': latlng}, (results, status) => {
      if (status === 'OK') {
        if (results[1]) {
          this.setState({address : results[1].formatted_address});

        }
      }
    });
  }

  render(){
    return (
      <div className="col col-right">
        <h4>Best seller</h4>
        <p>This is the faster selling store in the area.</p>
        <h4 className="best-seller"> <a href="#">{this.state.best.name} <span className="pull-right">{this.state.best.sales}</span></a> </h4>
        <p>{this.state.address}</p>
      </div>
    );
  }
}

export default BestSeller;
