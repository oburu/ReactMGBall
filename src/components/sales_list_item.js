import React from 'react';

const SalesListItem = (props) => {
  let {name, sales} = props.sale;
  return (
    <a href="#" className="list-item">
      {name } <span className="pull-right"> {sales} </span>
    </a>
  )
}

export default SalesListItem;
