import React from 'react';

const SalesList = (props) => {
  const videoItems = props.sales.map((shop) => {
    return <li key={shop.time} className="list-group-item justify-content-between">
      { shop.name } <span className="badge badge-default badge-pill">{ shop.sales }</span>
      </li>;
  });
  return(
    <div>
      <ul className="list-group">
        { videoItems }
      </ul>
    </div>
  );
}

export default SalesList;
