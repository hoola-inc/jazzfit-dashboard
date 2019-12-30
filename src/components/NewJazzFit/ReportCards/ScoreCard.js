import React from "react";

import { Row, Col, Collapse, Icon } from "antd";
const { Panel } = Collapse;

const text = `
Limit yourself to just one cup of caffeinated coffee at breakfast, or drink decaf. 
Too much caffeine in the morning can stay with you until bedtime. 
If you're used to drinking several cups of coffee a day, wean yourself off it gradually over a few weeks.
`;

const customPanelStyle = {
  background: "#fffff",
  borderRadius: 4,
  marginBottom: 10,
  border: 2,
  boxShadow: " 0px 6px 18px rgba(0, 0, 0, 0.06)",
  overflow: "visible"
};

class ScoreCard extends React.Component {
  render() {
    return (
      <div style ={{marginBottom:"7%"}}>
        <Row>
          <Col span={24}>
            <Collapse
              bordered={false}
              expandIconPosition="right"
              expandIcon={({ isActive }) => (
                <Icon
                  type="right"
                  rotate={isActive ? -90 : 90}
                  style={{
                    backgroundColor: "#d4424e",
                    color: "#fff",
                    width: "500",
                    height: "500",
                    borderRadius: 100 / 2,
                    width: " 20px",
                    height: "20px",
                    paddingTop: "0.5%"
                  }}
                />
              )}
            >
              <Panel header="Avoid Caffeine" key="1" style={customPanelStyle}>
                <p>{text}</p>
              </Panel>
              <Panel header="Avoid Caffeine" key="2" style={customPanelStyle}>
                <p>{text}</p>
              </Panel>
              <Panel header="Avoid Caffeine" key="3" style={customPanelStyle}>
                <p>{text}</p>
              </Panel>
              <Panel header="Avoid Caffeine" key="4" style={customPanelStyle}>
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ScoreCard;
