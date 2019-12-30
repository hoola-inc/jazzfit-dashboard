import React from "react";
import { Layout, Menu, Row, Col, Card } from "antd";
import BarChart from "../charts/BarChart";
import HomeTable from "../Tables/HomeTable";

const { Header, Content, Footer } = Layout;

class LayoutExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
          </Menu>
        </Header>
        {/* Card Row Started */}
        <Row gutter={16} style={{ padding: "25px", textAlign: "center" }}>
          <Col span={6}>
            <Card>Foo</Card>
          </Col>

          <Col span={6}>
            <Card>Foo</Card>
          </Col>

          <Col span={6}>
            <Card>Foo</Card>
          </Col>

          <Col span={6}>
            <Card>Foo</Card>
          </Col>
        </Row>

        {/* Card Row Ended */}

        {/* Bar chart start */}
        <Row gutter={16}>
          <Col span={16}>
            <BarChart />
          </Col>
          <Col span={8}>
              <Card> Boo </Card>
              <Card>Baa</Card>
          </Col>
        </Row>

        {/* Bar chart end */}

        {/* Table start  */}
        <Row gutter={16}>
        <HomeTable/>
        </Row>
        <Footer style={{ textAlign: "center" }}>
          Jazz Fit ©2019 Created by Hoola Tech
        </Footer>
      </Layout>
    );
  }
}

export default LayoutExample;
