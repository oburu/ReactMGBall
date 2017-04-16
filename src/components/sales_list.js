import React, { Component } from 'react';
import SalesListItem from './sales_list_item';
import Modal from './modal';

export default class SalesList extends Component {
  constructor () {
    super();

    this.state = {
      showModal: false,
      modalInfo : {
        name:'',
        sales:''
      }
    };
  }
  handleOpenModal (shopInfo) {
    this.setState({
      showModal: true,
      modalInfo:{
        name : shopInfo.name,
        sales: shopInfo.sales,
        latitude: shopInfo.latitude,
        longitude: shopInfo.longitude
      }
    });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render(){
    const salesItems = this.props.sales.map((sale, i) => {
      return (
        <SalesListItem key={i} sale={sale} onItemClick={this.handleOpenModal.bind(this)}/>
      );
    });
    let style = {
      display: this.props.loading
    };
    const renderModal = () =>{
      if(this.state.showModal){
        return (
          <Modal>
            <h1 className='lead'>{this.state.modalInfo.name}</h1>
            <p className="lead">Sold {this.state.modalInfo.sales} gums.</p>
            <p>Location: {this.state.modalInfo.latitude}, {this.state.modalInfo.longitude}</p>
            <button className="btn btn-success" onClick={this.handleCloseModal.bind(this)}>Close</button>
          </Modal>
        );
      }
    }

    return(
      <div className="total-sales-panel">
        <h4>Latest sales</h4>
        <p style={style} className="lead">Fetching data from API...</p>
        <div className="list">
          {salesItems}
        </div>
        {renderModal()}
      </div>
    );
  }
}
