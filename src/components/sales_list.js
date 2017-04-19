import React, { Component } from 'react';
import SalesListItem from './sales_list_item';
import Modal from './modal';

export default class SalesList extends Component {
  constructor () {
    super();

    this.state = {
      items:[],
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
        longitude: shopInfo.longitude,
        createdAt: shopInfo.createdAt
      }
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({items: nextProps.sales});
  }

  filter(e){
    this.setState({filter: e.target.value})
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render(){
    let items = this.state.items;
    if(this.state.filter){
      items = items.filter(item =>
        item.name.toLowerCase()
        .includes(this.state.filter.toLowerCase())
      )
    }
    const salesItems = items.map((sale, i) => {
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
            <p className="lead">Sold {this.state.modalInfo.sales} gums at {this.state.modalInfo.createdAt}</p>
            <p>Location: {this.state.modalInfo.latitude}, {this.state.modalInfo.longitude}</p>
            <button className="btn btn-success" onClick={this.handleCloseModal.bind(this)}>OK</button>
          </Modal>
        );
      }
    }

    return(
      <div className="total-sales-panel">
        <h4>Latest sales</h4>
        <input type="text" className="form-control" onChange={this.filter.bind(this)} placeholder="Search for..."/>
        <p style={style} className="lead">Fetching data from API...</p>
        <div className="list">
          {salesItems}
        </div>
        {renderModal()}
      </div>
    );
  }
}
