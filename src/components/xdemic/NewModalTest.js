import React from "react";
import {
  Upload,
  Button,
  Form,
  Icon,
  Input,
  Modal,
  Row,
  Col,
  DatePicker
} from "antd";
class NewModalTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col
          xs={{ span: 23, offset: 1 }}
          lg={{ span: 6, offset: 2 }}
          style={{ backgroundColor: "red" }}
        >
          <Button type="primary">Primary</Button>
        </Col>
        <Col
          xs={{ span: 23, offset: 1 }}
          lg={{ span: 6, offset: 2 }}
          style={{ backgroundColor: "blue" }}
        >
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col
          xs={{ span: 23 }}
          lg={{ span: 6, offset: 2 }}
          style={{ backgroundColor: "yellow" }}
        >
          <Button type="dashed">Primary</Button>
        </Col>
        <Row>
            <Col span={18}>
                col span 18
            </Col>
            <Col span ={8}>col span 18 new</Col>
        </Row>
      </Row>
    );
  }
}

export default NewModalTest;
