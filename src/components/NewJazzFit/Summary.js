import React from "react";
import Header from "../common/HeaderLayout";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../MyCSS/MyCss.css";
import {
  Layout,
  Row,
  Col,
  Button,
  Divider,
  Avatar,
  Progress,
  Collapse
} from "antd";
import SummaryCard from "./ReportCards/SummaryCard";
import ProCharts from "../charts/ProCharts";
import SvgChart from "../charts/SvgChart";
import { renderToString } from "react-dom/server";
import PDF, { Text, AddPage, Line, Image, Table, Html } from "jspdf-react";
import physical from "../drawables/physical.png";
import mental from "../drawables/mental.png";
import emotional from "../drawables/emotional.png";
import social from "../drawables/social.png";
const { Panel } = Collapse;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const Prints = () => (
  <div>
    <Layout className="App">
      {/* <Header /> */}
      <Layout style={{ marginTop: "5%", padding: "0% 3%", background: "#fff" }}>
        <div style={{ background: "#fff" }}>
          <Row gutter={24}>
            <Col span={6} offset={1} style={{ padding: "0% 1%" }}>
              Summary {monthNames[new Date().getMonth()]} {new Date().getDate()}{" "}
              , {new Date().getFullYear()}
            </Col>
          </Row>
          <div style={{ margin: "1% 4% 0% 4%" }} className=" box-shadow">
            <Row gutter={24}>
              <Col span={12} offset={1}>
                <h1 style={{ marginTop: "1.2%" }}> OverAll Score</h1>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={14} offset={1}>
                <Divider style={{ marginLeft: "-7.3%" }}></Divider>
              </Col>
            </Row>
            <Row>
              <Col span={3} offset={1}>
                {/* TO DO charts */}
                {/* <ProCharts /> */}
              </Col>
              <Col span={12}>
                Your wellbeing needs attention; Some dimensions of your life
                need to be worked on. Without addressing them, you may have to
                face adverse consequences related to health, stress, anxiety,
                relationships and self-image. Please read the summary of your
                results and make use of the recommendations provided.
              </Col>
            </Row>
            <Row>
              <Col span={2} offset={1} style={{ marginTop: "20px" }}>
                You are in the 87th percentile and your score ranks 22nd.
              </Col>
            </Row>
          </div>
          {/* Summary Cards */}
          <Row gutter={24} style={{ marginTop: "2%" }}>
            {/* Physical Card */}
            <Col span={10} offset={1}>
              <Row gutter={[48, 48]}>
                <Col span={12}>
                  <h1>Physical Wellness</h1>
                </Col>

                <Divider
                  style={{
                    background: "##FFC20E",
                    borderradius: "3px",
                    height: "3px"
                  }}
                ></Divider>
                <Row gutter={24}>
                  <Col span={12}>
                    You are good at managing your emotional wellbeing; however,
                    there are areas which need your immediate attention. Little
                    changes can lead to a much better and productive lifestyle.
                  </Col>
                  <Col span={6} offset={2}>
                    <Progress
                      type="circle"
                      percent={75}
                      strokeColor="#F00"
                      width="100px"
                      style={{ margin: "20px" }}
                    />
                  </Col>
                  <Divider></Divider>
                </Row>
                {/* first  */}
                {/* <SummaryCard /> */}
              </Row>
            </Col>

            {/* Emotional Wellness start here */}
            <Col span={10} offset={2}>
              <Row gutter={[12, 24]}>
                <Col span={12}>
                  <h1>Emotional Wellness</h1>
                </Col>

                <Divider
                  style={{
                    background: "##FFC20E",
                    borderradius: "3px",
                    height: "3px"
                  }}
                ></Divider>
                <Row gutter={24}>
                  <Col span={12}>
                    You are good at managing your emotional wellbeing; however,
                    there are areas which need your immediate attention. Little
                    changes can lead to a much better and productive lifestyle.
                  </Col>
                  <Col span={6} offset={2}>
                    <Progress
                      type="circle"
                      percent={75}
                      strokeColor="#0F0"
                      width="100px"
                      style={{ margin: "20px" }}
                    />
                  </Col>
                  <Divider></Divider>
                </Row>
                {/* first  */}
                {/* <SummaryCard /> */}
              </Row>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: "2%" }}>
            {/* Mental Card */}
            <Col span={10} offset={1}>
              <Row gutter={[12, 24]}>
                <Col span={12}>
                  <h1>Mental Wellness</h1>
                </Col>
                <Divider
                  style={{
                    background: "##FFC20E",
                    borderradius: "3px",
                    height: "3px"
                  }}
                ></Divider>
                <Row gutter={24}>
                  <Col span={12}>
                    You are good at managing your emotional wellbeing; however,
                    there are areas which need your immediate attention. Little
                    changes can lead to a much better and productive lifestyle.
                  </Col>
                  <Col span={6} offset={2}>
                    <Progress
                      type="circle"
                      percent={75}
                      strokeColor="#0F0"
                      width="100px"
                      style={{ margin: "20px" }}
                    />
                  </Col>
                  <Divider></Divider>
                </Row>
                {/* first  */}
                {/* <SummaryCard /> */}
              </Row>
            </Col>

            {/* Social Wellness start here */}
            <Col span={10} offset={2}>
              <Row gutter={[12, 24]}>
                <Col span={12}>
                  <h1>Social Wellness</h1>
                </Col>
                <Divider
                  style={{
                    background: "##FFC20E",
                    borderradius: "3px",
                    height: "3px"
                  }}
                ></Divider>
                <Row gutter={24}>
                  <Col span={12}>
                    You are good at managing your emotional wellbeing; however,
                    there are areas which need your immediate attention. Little
                    changes can lead to a much better and productive lifestyle.
                  </Col>
                  <Col span={12}>
                    <Progress
                      type="circle"
                      percent={75}
                      strokeColor="#00F"
                      width="100px"
                      style={{ margin: "20px" }}
                    />
                  </Col>
                  <Divider></Divider>
                </Row>
                {/* first  */}
                {/* <SummaryCard /> */}
              </Row>
            </Col>
          </Row>
        </div>
      </Layout>
      <div style={{ marginBottom: "5%" }}></div>
    </Layout>
  </div>
);

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: "",
      recomendations: "",
      physicalData: [],
      emotionalData: [],
      socialData: [],
      mentalData: [],
      physicalScore: 0,
      loading: false,
      iconLoading: false
    };
  }

  print = () => {
    const string = renderToString(<Prints />);
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.fromHTML(string);
    pdf.addPage();
    pdf.fromHTML(string);
    pdf.save("pdf");
  };

  componentDidMount() {
    const empid = localStorage.getItem("empID");
    console.log("emp id", empid);

    axios
      .get("https://jazzfit-api.herokuapp.com/refreshtoken/" + empid)
      .then(response => {
        console.log(response);
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
              console.log("totalscor ", response.data);
              if (response.data.status) {
                this.setState({
                  totalScore: response.data.data[0]
                });
              }
            })
            .catch(error => {
              console.log(error.message);
            });
          // rescomendatioan
          axios
            .get("https://jazzfit-api.herokuapp.com/recommendations/" + empid, {
              headers: headers
            })
            .then(response => {
              console.log("recomendations ", response.data);
              if (response.data.status) {
                response.data.data.map(data => {
                  if (data.wellnessType === "physical") {
                    console.log("ddata .wellner tuyp ", data);
                    this.setState({
                      physicalData: this.state.physicalData.concat(data)
                    });
                  }
                  if (data.wellnessType === "emotional") {
                    console.log("ddata .wellner tuyp ", data);
                    this.setState({
                      emotionalData: this.state.emotionalData.concat(data)
                    });
                  }
                  if (data.wellnessType === "social") {
                    console.log("ddata .wellner tuyp ", data);
                    this.setState({
                      socialData: this.state.socialData.concat(data)
                    });
                  }
                  if (data.wellnessType === "mental") {
                    console.log("ddata .wellner tuyp ", data);
                    this.setState({
                      mentalData: this.state.mentalData.concat(data)
                    });
                  }
                });

                this.setState({
                  recomendations: response.data.data[0],
                  physicalScore: this.state.totalScore.physicalScore
                });
              }
            })
            .catch(error => {
              console.log(error.message);
            });
          this.setState({
            jwtToken: response.data.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  _exportPdf = () => {
    this.enterIconLoading();
    this.setState({ iconLoading: true });

    html2canvas(document.querySelector("#root")).then(canvas => {
      // document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "em", "a4");
      let width = pdf.internal.pageSize.getWidth();

      pdf.setFontSize(40);
      // pdf.text("Octonyan loves jsPDF", 35, 25);
      // pdf.text('Foo', 55, 55);

      // pdf.addImage('examples/images/Octonyan.jpg', 'JPEG', 15, 40, 180, 180);
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height / 1.8);
      const today = new Date().toISOString().slice(0, 10);
      pdf.save(`${today}-total-score.pdf`);
      this.setState({ iconLoading: false });
    });
  };
  render() {
    return (
      <Layout className="App">
        <Header />
        <Layout
          style={{ marginTop: "5%", padding: "0% 3%", background: "#fff" }}
        >
          <div ref="theChild" style={{ background: "#fff" }}>
            <Row gutter={24}>
              <Button type="primary" onClick={this.print}>
                print
              </Button>
              <Col
                span={2}
                offset={1}
                style={{ padding: "0% 1%" }}
                className="font-weight-sixteen"
              >
                Summary
              </Col>
              <Col
                span={4}
                className="font-weight-sixteen"
                style={{ margin: "0% -3%" }}
              >
                {monthNames[new Date().getMonth()]}
                {new Date().getDate()} , {new Date().getFullYear()}
              </Col>
            </Row>
            <div style={{ margin: "1% 4% 0% 4%" }} className=" box-shadow">
              <Row gutter={24}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <h1
                    style={{ marginTop: "1.2%", padding: "3% 0% 0% 5%" }}
                    className="font-weight-sixteen"
                  >
                    OverAll Score
                  </h1>
                  <Button
                    type="primary"
                    onClick={this._exportPdf}
                    icon="download"
                    loading={this.state.iconLoading}
                    ghost
                  >
                    Generate PDF
                  </Button>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={14} offset={1}>
                  <Divider style={{ marginLeft: "-7.3%" }}></Divider>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 24 }} lg={{ span: 5, offset: 1 }}>
                  <SvgChart
                    radareData={[
                      {
                        physical: this.state.totalScore.physicalScore,
                        emotional: this.state.totalScore.emotionalScore,
                        social: this.state.totalScore.socialScore,
                        mental: this.state.totalScore.mentalScore
                      }
                    ]}
                  />
                  {/* <ProCharts
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
                </Col>
                <Col
                  xs={{ span: 20, offset: 1 }}
                  lg={{ span: 12 }}
                  className="font-size-sixteen"
                >
                  {this.state.totalScore.totalWellnessText}
                </Col>
              </Row>
              <Row>
                <Col
                  xs={{ span: 20, offset: 1 }}
                  lg={{ span: 2, offset: 1 }}
                  style={{ marginTop: "20px", marginBottom: "8px" }}
                >
                  You are in the 87th percentile and your score ranks 22nd.
                </Col>
              </Row>
            </div>
            {/* Summary Cards */}
            <Row gutter={24} style={{ marginTop: "2%" }}>
              {/* Physical Card */}
              <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                <Row gutter={[48, 48]}>
                  <Col xs={{ span: 4 }} lg={{ span: 2 }}>
                    <Avatar src={physical} />
                  </Col>
                  <Col span={12}>
                    <h1 className="font-weight-sixteen">Physical Wellness</h1>
                  </Col>

                  <Divider
                    style={{
                      background: "##FFC20E",
                      borderradius: "3px",
                      height: "3px",
                      marginTop: "5%"
                    }}
                  ></Divider>
                  <Row gutter={24}>
                    <Col
                      xs={{ span: 12 }}
                      lg={{ span: 18 }}
                      className="font-size-small"
                    >
                      {this.state.totalScore.physicalWellnessText}
                    </Col>
                    <Col span={6}>
                      <Progress
                        type="circle"
                        percent={this.state.totalScore.physicalScore}
                        strokeColor="#1da336"
                        strokeWidth="7"
                        width="100px"
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider></Divider>
                  </Row>
                  {/* first  */}
                  {this.state.physicalData.map((physical, index) => {
                    return (
                      <div>
                        <div>
                          <div
                            className="box-shadow"
                            style={{
                              marginTop: "20px",
                              padding: "2% 0% 2% 2%"
                            }}
                          >
                            <Row gutter={24}>
                              <Col span={23}>
                                <h1 className="font-weight-sixteen">
                                  {physical.question}
                                </h1>
                                <Divider></Divider>
                              </Col>
                            </Row>
                            {physical.recommendation.length === 0 ? (
                              "Great Job"
                            ) : (
                              <div>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <h3>
                                      {physical.recommendationTitle}
                                      {/* Sleep is essential for your physical
                                  wellbeing. On-going sleep deficiency can add
                                  to your stress and anxieties. Here are a few
                                  tips that can help you get good sleep. */}
                                    </h3>
                                  </Col>
                                </Row>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <Collapse bordered={false}>
                                      <Panel
                                        showArrow={false}
                                        header="Read More"
                                        type="link"
                                      >
                                        {physical.recommendation.map(
                                          (data, index) => {
                                            return (
                                              <div>
                                                <p>{data.detail}</p>
                                              </div>
                                            );
                                          }
                                        )}
                                      </Panel>
                                    </Collapse>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* <SummaryCard physicalData={this.state.physicalData}/> */}
                </Row>
              </Col>

              {/* Emotional Wellness start here */}
              <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 2 }}>
                <Row gutter={[12, 24]}>
                  <Col xs={{ span: 4 }} lg={{ span: 2 }}>
                    <Avatar src={emotional} />
                  </Col>
                  <Col span={12}>
                    <h1 className="font-weight-sixteen">Emotional Wellness</h1>
                  </Col>

                  <Divider
                    style={{
                      background: "##FFC20E",
                      borderradius: "3px",
                      height: "3px",
                      marginTop: "5%"
                    }}
                  ></Divider>
                  <Row gutter={24}>
                    <Col
                      xs={{ span: 12 }}
                      lg={{ span: 18 }}
                      className="font-size-small"
                    >
                      {this.state.totalScore.emotionalWellnessText}
                    </Col>
                    <Col span={6}>
                      <Progress
                        type="circle"
                        percent={this.state.totalScore.emotionalScore}
                        strokeColor="#fff703"
                        strokeWidth="7"
                        width="100px"
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider></Divider>
                  </Row>
                  {/* first  */}
                  {this.state.emotionalData.map((emotional, index) => {
                    return (
                      <div>
                        <div>
                          <div
                            className="box-shadow"
                            style={{
                              marginTop: "20px",
                              padding: "2% 0% 2% 2%"
                            }}
                          >
                            <Row gutter={24}>
                              <Col span={23}>
                                <h1 className="font-weight-sixteen">
                                  {emotional.question}
                                </h1>
                                <Divider></Divider>
                              </Col>
                            </Row>
                            {emotional.recommendation.length === 0 ? (
                              "Great Job"
                            ) : (
                              <div>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <h3>
                                      {emotional.recommendationTitle}
                                      {/* Sleep is essential for your physical
                                      wellbeing. On-going sleep deficiency can
                                      add to your stress and anxieties. Here are
                                      a few tips that can help you get good
                                      sleep. */}
                                    </h3>
                                  </Col>
                                </Row>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <Collapse bordered={false}>
                                      <Panel
                                        showArrow={false}
                                        header="Read More"
                                        type="link"
                                      >
                                        {emotional.recommendation.map(
                                          (data, index) => {
                                            return (
                                              <div>
                                                <p>{data.detail}</p>
                                              </div>
                                            );
                                          }
                                        )}
                                      </Panel>
                                    </Collapse>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* <SummaryCard /> */}
                </Row>
              </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: "2%" }}>
              {/* Mental Card */}
              <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                <Row gutter={[12, 24]}>
                  <Col xs={{ span: 4 }} lg={{ span: 2 }}>
                    <Avatar src={mental} />
                  </Col>
                  <Col span={12}>
                    <h1 className="font-weight-sixteen">Mental Wellness</h1>
                  </Col>

                  <Divider
                    style={{
                      background: "##FFC20E",
                      borderradius: "3px",
                      height: "3px",
                      marginTop: "5%"
                    }}
                  ></Divider>
                  <Row gutter={24}>
                    <Col
                      xs={{ span: 12 }}
                      lg={{ span: 18 }}
                      className="font-size-small"
                    >
                      {this.state.totalScore.mentalWellnessText}
                    </Col>
                    <Col span={6}>
                      <Progress
                        type="circle"
                        percent={this.state.totalScore.mentalScore}
                        strokeColor="#ff8903"
                        strokeWidth="7"
                        width="100px"
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider></Divider>
                  </Row>
                  {/* first  */}
                  {this.state.mentalData.map((mental, index) => {
                    return (
                      <div>
                        <div>
                          <div
                            className="box-shadow"
                            style={{
                              marginTop: "20px",
                              padding: "2% 0% 2% 2%"
                            }}
                          >
                            <Row gutter={24}>
                              <Col span={23}>
                                <h1 className="font-weight-sixteen">
                                  {mental.question}
                                </h1>
                                <Divider></Divider>
                              </Col>
                            </Row>
                            {mental.recommendation.length === 0 ? (
                              "Great Job"
                            ) : (
                              <div>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <h3>
                                      {mental.recommendationTitle}
                                      {/* Sleep is essential for your physical
                                      wellbeing. On-going sleep deficiency can
                                      add to your stress and anxieties. Here are
                                      a few tips that can help you get good
                                      sleep. */}
                                    </h3>
                                  </Col>
                                </Row>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <Collapse bordered={false}>
                                      <Panel
                                        showArrow={false}
                                        header="Read More"
                                        type="link"
                                      >
                                        {mental.recommendation.map(
                                          (data, index) => {
                                            return (
                                              <div>
                                                <p>{data.detail}</p>
                                              </div>
                                            );
                                          }
                                        )}
                                      </Panel>
                                    </Collapse>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* <SummaryCard /> */}
                </Row>
              </Col>

              {/* Social Wellness start here */}
              <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 2 }}>
                <Row gutter={[12, 24]}>
                  <Col xs={{ span: 4 }} lg={{ span: 2 }}>
                    <Avatar src={social} />
                  </Col>
                  <Col span={12}>
                    <h1 className="font-weight-sixteen">Social Wellness</h1>
                  </Col>

                  <Divider
                    style={{
                      background: "##FFC20E",
                      borderradius: "3px",
                      height: "3px",
                      marginTop: "5%"
                    }}
                  ></Divider>
                  <Row gutter={24}>
                    <Col
                      xs={{ span: 12 }}
                      lg={{ span: 18 }}
                      className="font-size-small"
                    >
                      {this.state.totalScore.socialWellnessText}
                    </Col>
                    <Col span={6}>
                      <Progress
                        type="circle"
                        percent={this.state.totalScore.socialScore}
                        strokeColor="#00F"
                        strokeWidth="7"
                        width="100px"
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider></Divider>
                  </Row>
                  {/* first  */}
                  {this.state.socialData.map((social, index) => {
                    return (
                      <div>
                        <div>
                          <div
                            className="box-shadow"
                            style={{
                              marginTop: "20px",
                              padding: "2% 0% 2% 2%"
                            }}
                          >
                            <Row gutter={24}>
                              <Col span={23}>
                                <h1 className="font-weight-sixteen">
                                  {social.question}
                                </h1>
                                <Divider></Divider>
                              </Col>
                            </Row>
                            {social.recommendation.length === 0 ? (
                              "Great Job"
                            ) : (
                              <div>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <h3>
                                      {social.recommendationTitle}
                                      {/* Sleep is essential for your physical
                                      wellbeing. On-going sleep deficiency can
                                      add to your stress and anxieties. Here are
                                      a few tips that can help you get good
                                      sleep. */}
                                    </h3>
                                  </Col>
                                </Row>
                                <Row gutter={24}>
                                  <Col span={24}>
                                    <Collapse bordered={false}>
                                      <Panel
                                        showArrow={false}
                                        header="Read More"
                                        type="link"
                                      >
                                        {social.recommendation.map(
                                          (data, index) => {
                                            return (
                                              <div>
                                                <p>{data.detail}</p>
                                              </div>
                                            );
                                          }
                                        )}
                                      </Panel>
                                    </Collapse>
                                    {/* <Button type="link">Read More</Button> */}
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* <SummaryCard /> */}
                </Row>
              </Col>
            </Row>
          </div>
        </Layout>
        <div style={{ marginBottom: "5%" }}></div>
      </Layout>
    );
  }
}

export default Summary;
