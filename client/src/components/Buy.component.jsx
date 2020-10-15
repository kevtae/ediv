import React from "react";
import Popup from "reactjs-popup";

import SmartContract from "./smartcontract.component";

import "./buy.styles.scss";

const Buy = ({ price }) => {
  return (
    <div className="main">
      <Popup
        trigger={<button className="button"> buy with eDiv</button>}
        modal
        nested
      >
        {(close) => <SmartContract close={close} />}
      </Popup>
    </div>
  );
};

export default Buy;
