import React from "react";
import { Layout, Menu, Breadcrumb, Button, Avatar, Icon, Row, Col } from "antd";
import jazzlogo from "../drawables/jazzlogo.png";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const logo = require("../drawables/jazzlogo.png");
const fitlogo = require("../drawables/fitlogo.png");

class HeaderLayout extends React.Component {
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
      
          <div
            className="box-shadow navbar"
           
          >
            <div className="logo">
              <Link to="/">
                <img
                  src={fitlogo}
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0px 0px 0px 8px",
                    float: "left"
                  }}
                />
              </Link>
            </div>
            <div className="logoimage">
              <Link to="/">
                <img src={logo}></img>
              </Link>
            </div>
            <div className="navbar-side-items">
              <div
              className="avatar"
              >
                <Link to="/settings">
                <Avatar size={50} icon="user" />
                </Link>

              </div>
              <ul
                class="_nav_list"
                style={{ lineHeight: "40%", float: "right" }}
              >
                {/* <li class="_nav_list_item">
                  <Link to="/settings">
                    <a href="">
                      <div class="_nav_icon">
                        <Icon type="question" />
                      </div>
                      <span class="_nav_text">Help</span>
                    </a>
                  </Link>
                </li> */}
                {/* <li class="_nav_list_item">
                  <a href="">
                    <div class="_nav_icon">
                      <Icon type="global" />
                    </div>
                    <span class="_nav_text">Language</span>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
    );
  }
}
export default HeaderLayout;
