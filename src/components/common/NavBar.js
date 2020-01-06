import React from "react";
import {
  Layout,
  Menu,
  Button,
  Icon,
  Row,
  Col,
  Divider,
  Typography,
  Avatar
} from "antd";
import JazzSteps from "../jazzfit/JazzSteps";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const empId = localStorage.getItem("empID");
    this.refreshToken(empId);

    this.setState({
      section: this.props.match.params.id,
      empId: empId
    });

    
      // console.log("hi this props ", this.props.match.params.id);
    }, 3000);
  }

  render() {
    return (
      
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{ backgroundColor: "#fff" }}
            // collapsible
            // collapsed={this.state.collapsed}
            // onCollapse={this.onCollapse}
          >
            <div
              style={{
                height: "32px",
                background: "#eee",
                margin: "16px"
              }}
            ></div>
            <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
              {/* <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item> */}
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="pie-chart" theme="filled" />
                    <span>Wellness Report</span>
                  </span>
                }
              >
                <Menu.Item key="/profile">
                  <Link to="/profile">
                    <Icon type="desktop" />
                    <span>Profile</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">Scores</Menu.Item>
                <Menu.Item key="5">Analytics</Menu.Item>
                <Menu.Item key="6">Documentaion</Menu.Item>
              </SubMenu>
              {/* <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu> */}
              <Menu.Item key="9">
                <Icon type="setting" theme="filled" />
                <span>Setting</span>
              </Menu.Item>
              <Menu.Item key="10">
                <Icon type="info-circle" theme="filled" />
                <span>Help</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Row gutter={24}>
                <Col span={18} offset={18}>
                  <Button type="primary" icon="logout" size="Large">
                    Log Out
                  </Button>
                  <span>
                    <Divider type="vertical" />
                  </span>
                  {/* <Button type="primary" shape="circle" icon="logout" size="Large">
              </Button> */}
                  <Avatar size="large" icon="user" src= "https://jazzfit-api.herokuapp.com/75588259_10215514716169938_2327584842335649792_o.jpg" />
                </Col>
              </Row>
            </Header>
            <Content>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
              <div
                style={{
                  padding: 24,
                  background: "#eee",
                  minHeight: 360,
                  padding: 50
                }}
              >
                <JazzSteps />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Jazz Fit ©2018 Created by Hoola Tech
            </Footer>
          </Layout>
        </Layout>
     
    );
  }
}

export default NavBar;
