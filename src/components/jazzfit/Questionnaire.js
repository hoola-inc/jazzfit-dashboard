import React from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Pagination,
  Divider,
  Radio,
  Collapse,
  Icon
} from "antd";

const { TextArea } = Input;

const { Panel } = Collapse;
const genExtra = () => (
  // <Icon
  //   type="setting"
  //   onClick={event => {
  //     // If you don't want click extra trigger collapse, you can prevent this:
  //     event.stopPropagation();
  //   }}
  // />
  <Radio ></Radio>
);
class Questionnaire extends React.Component {
  render() {
    return (
      <div  >
        <Row gutter={24}>
          <Col span={6}>
            <h1 style={{ fontWeight: "bold" }}> Section A: Physical</h1>
          </Col>
          <Col span={18} push={6}>
            <Pagination defaultCurrent={1} total={50} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <h3>A few questions about your physical lifestyle</h3>
          </Col>
          <Col span={18}>
            <span>
              <Divider orientation="left"> </Divider>
            </span>
            {/* _________________________________________________________________________________________________________________________ */}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={18} push={6}>
            {/* <TextArea rows={4} /> */}
            <Collapse >
              <Panel className="text-weight" disabled showArrow={false} header="A few questions about your physical lifestyle"  >
              </Panel>
              
            </Collapse>
          </Col>
          <Col span={6} pull={18}>
            <h1 style={{ fontWeight: "bold" }}> Question 1:</h1>
          </Col>
        </Row>

        <Row gutter={(24, 24)}>
          <Col span={6}>
            <h1 style={{ fontWeight: "bold" }}>Your Answer:</h1>
          </Col>
          <Col span={6}>
            <Collapse >
              <Panel header="Answer 1"  extra={genExtra()}>
              </Panel>
              
            </Collapse>
            {/* <Button
              block
              type="primary"
              icon="right"
              size="large"
              style={{ backgroundColor: "#eee" }}
            >
              Answer 1<Radio></Radio>
            </Button> */}
          </Col>
          <Col span={6}>
          <Collapse >
              <Panel header="Answer 2"  extra={genExtra()}>
              </Panel>
              
            </Collapse>
            {/* <Button
              block
              type="primary"
              icon="right"
              size="large"
              style={{ backgroundColor: "#eee" }}
            >
              Answer 2<Radio></Radio>
            </Button> */}
          </Col>
        </Row>

        <Row gutter={(24, 24)}>
          <Col span={6}></Col>
          <Col span={6}>
          <Collapse >
              <Panel header="Answer 3"  extra={genExtra()}>
              </Panel>
              
            </Collapse>
            {/* <Button
              block
              type="primary"
              icon="right"
              size="large"
              style={{ backgroundColor: "#eee" }}
            >
              Answer 3<Radio></Radio>
            </Button> */}
          </Col>
          <Col span={6}>
          <Collapse >
              <Panel header="Answer 4"  extra={genExtra()}>
              </Panel>
              
            </Collapse>
            {/* <Button
              block
              type="primary"
              icon="right"
              size="large"
              style={{ backgroundColor: "#eee" }}
            >
              Answer 4<Radio></Radio>
            </Button> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Questionnaire;
