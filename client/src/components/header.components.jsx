import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <div className="options">
      <Link className="option" to="/">
        Home
      </Link>
      <Link className="option" to="/shop">
        Shop
      </Link>
      <Link className="option" to="/dashboard">
        Dashboard
      </Link>
    </div>
  </div>
);

export default Header;
