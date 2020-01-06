import React from "react";
import { h1, Col, Row, Button, Divider, Input, Progress, Avatar } from "antd";
import { Radar, ChartCard } from "ant-design-pro/lib/Charts";
import { Link } from "react-router-dom";
import "../MyCSS/MyCss.css";
import { resolveMx } from "dns";
import ProCharts from "../charts/ProCharts";
import SvgChart from "../charts/SvgChart";
import axios from "axios";
import physical from "../drawables/physical.png";
import mental from "../drawables/mental.png";
import emotional from "../drawables/emotional.png";
import social from "../drawables/social.png";
const radarOriginData = [
  {
    name: "Survey 1",
    physical: 8,
    emotional: 5,
    social: 4,
    mental: 3
  }
];
const radarData = [];
const radarTitleMap = {
  physical: "physical",
  emotional: "emotional",
  social: "social",
  mental: "mental"
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== "name") {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key]
      });
    }
  });
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: ""
    };
  }

  componentDidMount() {
    const empid = localStorage.getItem("empID");
    // console.log("emp id", empid);

    axios
      .get("https://jazzfit-api.herokuapp.com/refreshtoken/" + empid)
      .then(response => {
        // console.log(response);
        if (response.data.status === true) {
          const headers = {
            "Content-Type": "application/json",
            "x-access-token": response.data.data
          };
          axios
            .get("https://jazzfit-api.herokuapp.com/totalscore/" + empid, {
              headers: headers
            })
            .then(response => {
              // // console.log(response.data);
              // console.log('Total ::: ', response.data.data[0]);
              if (response.data.status) {
                this.setState({
                  totalScore: response.data.data[0]
                });
              }
            })
            .catch(error => {
              // console.log(error.message);
            });
          this.setState({
            jwtToken: response.data.data
          });
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  renderSwitch(param) {
    switch (param) {
      case 'foo':
        return 'bar';
      default:
        return 'foo';
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <h1 style={{ textAlign: "start" }}>
              Following are your comprehensive wellness metrics. Click on any
              score to read more.
            </h1>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 8 }}
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
              marginBottom: "5%"
            }}
            className="box-border"
          >
            <Row>
              <h1
                className="steps-headings"
                style={{ textAlign: "start", padding: "5% 0% 0% 3%" }}
              >
                Overall Score
              </h1>
            </Row>

            <Divider style={{ margin: "10px 0 10px 0" }}></Divider>
            <Row gutter={24}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <div>
                  <SvgChart
                    radareData={[
                      {
                        physical: this.state.totalScore.physicalScore,
                        emotional: this.state.totalScore.emotionalScore,
                        social: this.state.totalScore.socialScore,
                        mental: this.state.totalScore.mentalScore,
                        totalScore: this.state.totalScore.totalScore
                      }
                    ]}
                  />
                  {/* <ProCharts
                  style={{padding:"20px"}}
                    radareData={[
                      {
                        
                        physical: parseInt(this.state.totalScore.physicalScore),
                        emotional: parseInt(this.state.totalScore.emotionalScore),
                        social: parseInt(this.state.totalScore.socialScore),
                        mental: parseInt(this.state.totalScore.mentalScore),
                        total:parseInt(this.state.totalScore.totalScore)
                      }
                    ]}
                  /> */}
                </div>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                className="font-weight-fourteen"
                style={{ padding: "5% 10% 7% 5%", textAlign: "center" }}
              >
                You are in the {this.state.totalScore.totalScore} percentile.
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 24 }}
                className="font-size-sixteen"
                style={{ padding: "0% 10% 0% 10%" }}
              >
                {this.state.totalScore.totalWellnessText}
              </Col>
            </Row>
            <Row gutter={24}>
              <Link target="_blank" to="/summary">
                <Col
                  xs={{ span: 24 }}
                  lg={{ span: 24 }}
                  className="font-size-sixteen-link"
                  style={{ margin: "5% 5% 5% 7%", textAlign: "left" }}
                >
                  Read Full Report{" "}
                </Col>
              </Link>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 16 }}>
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 11 }}
                className="box-border results-cards-col1"
              >
                <Row gutter={24}>
                  <Col span={18}>
                    <h1
                      className="steps-headings"
                      style={{ textAlign: "start", padding: "5% 0% 0% 3%" }}
                    >
                      Physical Score
                    </h1>
                  </Col>
                  <Col span={6}>
                    <Avatar
                      style={{ marginTop: "15%" }}
                      size="large"
                      src={physical}
                    />
                  </Col>
                </Row>

                <Divider style={{ margin: "10px 0 10px 0" }}></Divider>
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                    <Progress
                      type="circle"
                      percent={this.state.totalScore.physicalScore}
                      strokeColor="#bfd632"
                      strokeLinecap="square"
                      strokeWidth="9"
                      width={100}
                      style={{ marginLeft: "10%" }}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 16, offset: 1 }}
                    className="font-size-ten"
                    style={{
                      paddingLeft: "5%",
                      paddingRight: "5%",
                      textAlign: "left"
                    }}
                  >
                    {this.state.totalScore.physicalWellnessText}
                    <p>
                      <Link
                        to={{
                          pathname: `/scores${"/physical"}`
                        }}
                        target="_blank"
                        style={{color: "#bfd632"}}
                      >
                        {/* <Col span={6} offset={6} style={{ padding: "0 0 5% 0" }}> */}
                        Read More
                        {/* </Col> */}
                      </Link>
                    </p>
                  </Col>
                </Row>

                <Row gutter={24}></Row>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 11, offset: 1 }}
                className="box-border results-cards-col2"
              >
                <Row gutter={24}>
                  <Col span={18}>
                    <h1
                      className="steps-headings"
                      style={{ textAlign: "start", padding: "5% 0% 0% 3%" }}
                    >
                      Emotional Score
                    </h1>
                  </Col>
                  <Col span={6}>
                    <Avatar
                      style={{ marginTop: "15%" }}
                      size="large"
                      src={emotional}
                    />
                  </Col>
                </Row>

                <Divider style={{ margin: "10px 0 10px 0" }}></Divider>
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                    <Progress
                      type="circle"
                      percent={this.state.totalScore.emotionalScore}
                      strokeColor="#ef4323"
                      strokeLinecap="square"
                      strokeWidth="9"
                      width={100}
                      style={{ marginLeft: "10%" }}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 16, offset: 1 }}
                    className="font-size-ten"
                    style={{
                      paddingLeft: "5%",
                      paddingRight: "5%",
                      textAlign: "left"
                    }}
                  >
                    {this.state.totalScore.emotionalWellnessText}
                    <p>
                      <Link
                        to={{
                          pathname: `/scores${"/emotional"}`
                        }}
                        target="_blank"
                        style={{color: "#ef4323"}}
                      >
                        {/* <Col span={6} offset={6} style={{ padding: "0 0 5% 0" }}> */}
                        Read More
                        {/* </Col> */}
                      </Link>
                    </p>
                  </Col>
                </Row>
                <Row gutter={24}></Row>
              </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: "20px" }}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 11 }}
                className="box-border results-cards-col1"
              >
                <Row gutter={24}>
                  <Col span={18}>
                    <h1
                      className="steps-headings"
                      style={{ textAlign: "start", padding: "5% 0% 0% 3%" }}
                    >
                      Mental Score
                    </h1>
                  </Col>
                  <Col span={6}>
                    <Avatar
                      style={{ marginTop: "15%" }}
                      size="large"
                      src={mental}
                    />
                  </Col>
                </Row>

                <Divider style={{ margin: "10px 0 10px 0" }}></Divider>
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                    <Progress
                      type="circle"
                      percent={this.state.totalScore.mentalScore}
                      strokeColor="#834291"
                      strokeLinecap="square"
                      strokeWidth="9"
                      width = {100}
                      style={{ marginLeft: "10%" }}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 16, offset: 1 }}
                    className="font-size-ten"
                    style={{
                      paddingLeft: "5%",
                      paddingRight: "5%",
                      textAlign: "left"
                    }}
                  >
                    {this.state.totalScore.mentalWellnessText}
                    <p>
                      <Link
                        to={{
                          pathname: `/scores${"/mental"}`
                        }}
                        target="_blank"
                        style={{color: "#834291"}}
                      >
                        {/* <Col span={6} offset={6} style={{ padding: "0 0 5% 0" }}> */}
                        Read More
                        {/* </Col> */}
                      </Link>
                    </p>
                  </Col>
                </Row>

                <Row gutter={24}>
                  {/* <Link  to={{
                    pathname: `/scores${'/mental'}`
                  }}
                  target="_blank"
                  >
                    <Col span={6} offset={6} style={{ padding: "0 0 5% 0" }}>
                      Read More
                    </Col>
                  </Link> */}
                </Row>
              </Col>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 11 }}
                className="box-border results-cards-col2"
              >
                <Row gutter={24}>
                  <Col span={18}>
                    <h1
                      className="steps-headings"
                      style={{ textAlign: "start", padding: "5% 0% 0% 3%" }}
                    >
                      Social Score
                    </h1>
                  </Col>
                  <Col span={6}>
                    <Avatar
                      style={{ marginTop: "15%" }}
                      size="large"
                      src={social}
                    />
                  </Col>
                </Row>

                <Divider style={{ margin: "10px 0 10px 0" }}></Divider>
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                    <Progress
                      type="circle"
                      percent={this.state.totalScore.socialScore}
                      strokeColor="#18aeef"
                      strokeLinecap="square"
                      strokeWidth="9"
                      width={100}
                      style={{ marginLeft: "10%" }}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 16, offset: 1 }}
                    className="font-size-ten"
                    style={{
                      paddingLeft: "5%",
                      paddingRight: "5%",
                      textAlign: "left"
                    }}
                  >
                    {this.state.totalScore.socialWellnessText}
                    <p>
                      <Link
                        to={{
                          pathname: `/scores${"/social"}`
                        }}
                        target="_blank"
                        style={{color: "#18aeef"}}
                      >
                        {/* <Col span={24} offset={2} style={{ padding: "0 0 5% 0" }}> */}
                        Read More
                        {/* </Col> */}
                      </Link>
                    </p>
                  </Col>
                </Row>

                <Row gutter={24}></Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Results;
