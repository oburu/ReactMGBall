import React from 'react';

const SalesListItem = (props) => {
  let {name, sales} = props.sale;
  return (
    <a href="#" className="list-group-item">
      {name } store sold {sales} gums
    </a>
  )
}

export default SalesListItem;
