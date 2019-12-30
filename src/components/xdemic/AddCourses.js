import React from "react";
import {
  Row,
  Button,
  Col,
  Icon,
  Dropdown,
  Menu,
  message,
  Checkbox
} from "antd";

class AddCourses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleButtonClick(e) {
    console.log("click left button", e);
  }

  handleMenuClick(e) {
    console.log("click", e);
  }
  menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">
        <Checkbox>Elementary School (Kindergarten to x Grade)</Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox>Middle School (x Grade to x Grade)</Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox>High School (x Grade to x Grade)</Checkbox>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <div>
        <Row gutter={24} style={{ marginTop: 25 }}>
          <Row gutter={24} style={{ textAlign: "center" }}>
           
            <Col span={24} style={{ textAlign: "center" }}>
              Classcraft offers presets that help you encourage and assess
              specific behaviors.Select the category
              <br />
              that most closely laligns with your goals
            </Col>
          </Row>
          <Col span={12} offset={6}>
            <Row gutter={[24, 48]} style={{ marginTop: 25 }}>
              <Col span={24} style={{ textAlign: "center" }}>
                <Dropdown overlay={this.menu}>
                  <Button size="large">
                    Select Your School Level <Icon type="down" />
                  </Button>
                </Dropdown>
              </Col>
            </Row>
            <Row gutter={48} style={{ marginTop: 25 , marginLeft:24 , marginRight:-60 }}>
              <Col
                span={6}
                offset={1}
                className="box-shadow"
                style={{ minHeight: 300 }}
              >
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Icon
                      type="read"
                      style={{
                        fontSize: "40px",
                        margin: "3% 0 3% 0",
                        color: "blue"
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <h1 style={{ textAlign: "center" }}>General</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <h3 style={{ textAlign: "center" }}>
                      your classcraft's default preset <br /> for your grade
                      level
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      style={{ marginBottom: "3%" }}
                    >
                      Learn More
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col
                span={6}
                offset={1}
                className="box-shadow"
                style={{ minHeight: 300 }}
              >
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Icon
                      type="smile"
                      style={{
                        fontSize: "40px",
                        margin: "3% 0 3% 0",
                        color: "orange"
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    {" "}
                    <h1 style={{ textAlign: "center" }}>PBIS</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    {" "}
                    <h3 style={{ textAlign: "center" }}>
                      Maximize your efforts around <br /> Positive Behavorial{" "}
                      <br />
                      Interventions and Supports <br /> (PBIS)
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      style={{ marginBottom: "3%" }}
                    >
                      Learn More
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col
                span={6}
                offset={1}
                className="box-shadow"
                style={{ minHeight: 300 }}
              >
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Icon
                      type="heart"
                      theme="filled"
                      style={{
                        fontSize: "40px",
                        margin: "3% 0 3% 0",
                        color: "red"
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    {" "}
                    <h2 style={{ textAlign: "center" }}>
                      Social Emotional Learning
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    {" "}
                    <h3 style={{ textAlign: "center" }}>
                      Develop your students' social
                      <br /> emotional learning skills.
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      style={{ marginBottom: "3%" }}
                    >
                      Learn More
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AddCourses;
