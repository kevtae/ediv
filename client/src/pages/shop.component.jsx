import React, { Component } from "react";
import picture from "../asset/192782M236004_1.jpg";

import Buy from "../components/Buy.component";

import "./shop.styles.scss";

class ShopPage extends Component {
  state = { price: 600 };

  render() {
    return (
      <div className="shoppage">
        <div className="left">
          <p className="brand">Fear of God</p>
          <p className="description">
            High-top panelled suede sneakers colorblocked in green, grey, and
            beige. Topstitched detailing at round toe. Lace-up closure. Black
            buffed leather trim at padded tongue. Padded collar. Cut-out
            detailing at heel collar. Rubber midsole in beige featuring embossed
            logo at heel counter. Treaded rubber outsole in beige. Silver-tone
            hardware.
          </p>
        </div>
        <div className="middle">
          <img className="img-container" src={picture} />
        </div>
        <div className="right">
          <p className="price">${this.state.price} USD</p>
          <p className="shipping">
            United States : Free shipping and returns on all orders.
          </p>
          <Buy price={this.state.price} />
        </div>
      </div>
    );
  }
}

export default ShopPage;
