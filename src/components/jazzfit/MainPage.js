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
import JazzSteps from "./JazzSteps";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;
class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      // #components-layout-demo-side .logo {
      //   height: 32px;
      //   background: rgba(255, 255, 255, 0.2);
      //   margin: 16px;
      // }
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{ backgroundColor: "#fff" }}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
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
                  <span>Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="score">
                <Link to="/score">
                  <span>Scores</span>
                </Link>

              </Menu.Item>
              <Menu.Item key="analytics">
                <Link to="/analytics">
                  <span>Analytics</span>
                </Link>

              </Menu.Item>
              <Menu.Item key="documentation">
                <Link to="/documentation">
                  <span>Documentation</span>
                </Link>

              </Menu.Item>
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
                <Avatar size="large" icon="user" />
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

export default MainPage;
