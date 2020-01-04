import React, { Component } from "react";
import { Row, Col } from "antd";
import FormTest from "./Test";
import Sidebar from "../common/Sidebar";

class Yo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>

        <Row gutter={16}>
          <Col span={4}>
            <Sidebar></Sidebar>
          </Col>
          <Col span={8}>
            <FormTest />
          </Col>

        </Row>

      </div>
    );
  }
}

export default Yo;
