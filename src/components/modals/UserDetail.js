import React from "react";
import { Row, Col, Typography } from "antd";
import PieChart from "../charts/PieChart";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <Row type="flex" justify="start">
          <Col span={6}>
            <h1>Overall Graph</h1>
          </Col>
          <Col span={18} justify="center">
            <h1> Over all Wellness score
            description of score</h1>

          </Col>

        </Row>
        <Row type="flex" justify="start">
          <Col span={12}>
            <h1>Physical Score</h1>
          </Col>

          <Col span={12} >
            <Col span={6}><h1> Emotional Graph</h1></Col>
            <Col span={6}><h1> Emotional Score</h1></Col>
          </Col>

          <Col span={12}>
            <h1>Mental Score</h1>
          </Col>
          <Col span={12} justify="center">
            <h1>Social Score</h1>

          </Col>

        </Row>
      </div>
    );
  }
}

export default UserDetail;
