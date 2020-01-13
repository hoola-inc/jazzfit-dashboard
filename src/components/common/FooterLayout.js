import React from "react";
import { Layout, Menu, Breadcrumb, Button, Avatar, Icon, Row, Col } from "antd";
import jazzlogo from "../drawables/jazzlogo.png";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const logo = require("../drawables/jazzlogo.png");
const fitlogo = require("../drawables/logo.png");

class FooterLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div className="footerbar">
        <div className="logoF">
          <Link to="/">
            <img
              src={fitlogo}
              style={{
                width: "30px",
                height: "30px",
                marginBottom: "10px"
              }}
            />
          </Link>
        </div>
        <div className="powerby">
          <p>Powered by Carnelian</p>
        </div>
      </div>
    );
  }
}
export default FooterLayout;
