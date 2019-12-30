import React, { Component } from "react";
// import "";
import { Layout, Row, Col, Button, Divider, Avatar } from "antd";

class SummaryCard extends Component {
  render() {
    return (
      <div>
        <div
          className="box-shadow"
          style={{ marginTop: "20px", padding: "2% 0% 2% 2%" }}
        >
          <Row gutter={24}>
            <Col span={23}>
              <h1 className="font-weight-sixteen">Sleep</h1>
              <Divider></Divider>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <h3>
                Sleep is essential for your physical wellbeing. On-going sleep
                deficiency can add to your stress and anxieties. Here are a few
                tips that can help you get good sleep.
              </h3>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Button type="link">Read More</Button>
            </Col>
          </Row>
        </div>
        {/* second */}
        <div
          className="box-shadow"
          style={{ marginTop: "20px", padding: "2% 0% 2% 2%" }}
        >
          <Row gutter={24}>
          <Col span={23}>
              <h1 className="font-weight-sixteen">Sleep</h1>
              <Divider></Divider>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <h3>
                Sleep is essential for your physical wellbeing. On-going sleep
                deficiency can add to your stress and anxieties. Here are a few
                tips that can help you get good sleep.
              </h3>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Button type="link">Read More</Button>
            </Col>
          </Row>
        </div>
        <div
          className="box-shadow"
          style={{ marginTop: "20px", padding: "2% 0% 2% 2%" }}
        >
          {/* first  */}
          <Row gutter={24}>
          <Col span={23}>
              <h1 className="font-weight-sixteen">Sleep</h1>
              <Divider></Divider>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <h3>
                Sleep is essential for your physical wellbeing. On-going sleep
                deficiency can add to your stress and anxieties. Here are a few
                tips that can help you get good sleep.
              </h3>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Button type="link">Read More</Button>
            </Col>
          </Row>
        </div>
        {/* first  */}
        <div
          className="box-shadow"
          style={{ marginTop: "20px", padding: "2% 0% 2% 2%" }}
        >
          <Row gutter={24}>
          <Col span={23}>
              <h1 className="font-weight-sixteen">Sleep</h1>
              <Divider></Divider>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <h3>
                Sleep is essential for your physical wellbeing. On-going sleep
                deficiency can add to your stress and anxieties. Here are a few
                tips that can help you get good sleep.
              </h3>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Button type="link">Read More</Button>
            </Col>
          </Row>
        </div>
        {/* fith  */}
        <div
          className="box-shadow"
          style={{ marginTop: "20px", padding: "2% 0% 2% 2%" }}
        >
          <Row gutter={24}>
          <Col span={23}>
              <h1 className="font-weight-sixteen">Sleep</h1>
              <Divider></Divider>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <h3>
                Sleep is essential for your physical wellbeing. On-going sleep
                deficiency can add to your stress and anxieties. Here are a few
                tips that can help you get good sleep.
              </h3>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Button type="link">Read More</Button>
            </Col>
          </Row>
        </div>
        <div style={{marginBottom:"5%"}}></div>
      </div>
    );
  }
}
export default SummaryCard;
