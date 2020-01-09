import React from "react";
import Header from "../common/HeaderLayout";
import axios from "axios";
import "../MyCSS/MyCss.css";
import {
  Layout,
  Row,
  Col,
  Button,
  Divider,
  Avatar,
  Progress,
  message,
  Collapse,
  Icon
} from "antd";
import SummaryCard from "./ReportCards/SummaryCard";
import ScoreCard from "./ReportCards/ScoreCard";
const fitlogo = require("../drawables/logo.png");



const { Footer } = Layout;

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

class Scores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      BASEURL: "https://jazzfit-api.herokuapp.com/",
      recommendationsArr: [],
      recommendationsTypeArr: [],
      totalScoreArr: [],
      totalScoresTypeArr: [],
      section: "",
      jwtToken: "",
      empId: "",
      color: ""
    };
  }

  componentDidMount() {
    const empId = localStorage.getItem("empID");
    this.refreshToken(empId);

    this.setState({
      section: this.props.match.params.id,
      empId: empId
    });

    setTimeout(() => {
      // console.log("hi this props ", this.props.match.params.id);
    }, 3000);
  }

  refreshToken = async empId => {
    try {
      const response = await axios.get(
        `${this.state.BASEURL}refreshtoken/${empId}`
      );
      if (response.data.status) {
        const token = response.data.data;
        this.getRecommendations(empId, token);
        this.getTotalScore(empId, token);
      } else {
        message.error("refresh token");
      }
    } catch (error) {
      message.error("token catch");
    }
  };

  getRecommendations = async (empId, token) => {
    try {
      const requestHeader = { "x-access-token": token };
      const mydata = {
        empId: this.state.empId,
        wellnessType: this.state.section
      };
      const recommendations = await axios.post(
        `${this.state.BASEURL}recommendations`,
        mydata,
        { headers: requestHeader }
      );
      if (recommendations.data.status) {
        const recommendationsArr = recommendations.data.data;
        this.setState({ recommendationsArr: recommendationsArr, color: recommendationsArr[0].color });
        // console.log("Recommendations ", this.state.recommendationsArr);
        // console.log('color ::: ', this.state.recommendationsArr[0].color);
      }
    } catch (error) {
      message.error("bad request recommendations");
      // console.log(error);
    }
  };

  getTotalScore = async (empId, token) => {
    try {
      const requestHeader = { "x-access-token": token };
      const totalScoreData = await axios.get(
        `${this.state.BASEURL}totalscore/${empId}`,
        { headers: requestHeader }
      );
      if (totalScoreData.data.status) {
        const totalScoreArr = totalScoreData.data.data[0];
        this.setState({ totalScoreArr: totalScoreArr });

        // console.log("total score array", this.state.totalScoreArr);
        // console.log("Section ::: ", this.state.section);
      }
    } catch (error) {
      message.error("bad request total score");
    }
  };

  checkWellnessType = () => {
    this.state.recommendationsArr.map((element, index) => {
      if (element.wellnessType === this.state.section)
        this.setState({
          recommendationsTypeArr: this.state.recommendationsTypeArr.concat(
            element
          )
        });
    });
    //  console.log(
    //   "i am here ... ::: " + this.state.section + " ::: ",
    //   this.state.recommendationsTypeArr
    // );
  };

  render() {
    return (
      <Layout>
        <Header />
        <Layout>
          <div style={{ backgroundColor: "#fff" }}>
            <div className="totalscorescards">
              <div className="box-shadow">
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                    <h1
                      className="font-weight-sixteen"
                      style={{ padding: "24px 0px 0px 24px" }}
                    >
                      {this.state.section}
                    </h1>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Divider></Divider>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                    <Progress
                      type="circle"

                      strokeColor={this.state.color}

                      percent={this.state.totalScoreArr[this.state.section + "Score"]}

                      strokeWidth="9"
                      width={100}
                      style={{ padding: "0% 0% 5% 15%" }}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 18 }}
                    style={{ marginTop: "20px" }}
                  >
                    <Col
                      xs={{ span: 24 }}
                      lg={{ span: 16 }}
                      className="text-style"
                    >
                      <h1>
                        {
                          this.state.totalScoreArr[this.state.section + "WellnessText"]
                        }
                      </h1>
                    </Col>
                  </Col>
                </Row>
              </div>
              {/* Report Cards */}
              <Row gutter={24} style={{ marginTop: "2%" }}>
                {/* Physical Card */}

                {this.state.recommendationsArr.map((item, arrIndex) => {
                  return (
                    <>
                      <Col xs={{ span: 24 }} lg={{ span: 11, offset: 1 }}>
                        <Row>
                          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <h1 className="score-text">
                              Question {arrIndex + 1}: {item.question}
                            </h1>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={{ span: 6 }} lg={{ span: 2 }}>
                            <h1 className="text-weight">Answer:</h1>
                          </Col>
                          <Col xs={{ span: 12 }} lg={{ span: 4, offset: 1 }}>
                            <h1
                              className="text-weight"
                              style={{ color: item.color }}
                            >
                              {item.answer}
                            </h1>
                          </Col>
                        </Row>
                        <Row gutter={[48, 48]}>
                          <Col xs={{ span: 6 }} lg={{ span: 2 }}>
                            <h1 className="text-style">Tags</h1>
                          </Col>
                          <Col xs={{ span: 12 }} lg={{ span: 4, offset: 1 }}>
                            <h1 className="text-style">
                              #{this.state.section} wellness
                            </h1>
                          </Col>

                          <Divider
                            style={{
                              background: item.color,
                              borderradius: "3px",
                              height: "3px"
                            }}
                          ></Divider>
                          <Row gutter={24}>
                            <Col span={24} style={{ paddingRight: "15%", fontWeight: 'bold', marginBottom: '15px' }}>
                              {item.recommendationTitle}
                            </Col>
                          </Row>

                          {/* <Divider></Divider> */}
                          {this.state.recommendationsArr[arrIndex]
                            .recommendation.length > 0 ? (
                              <Row gutter={[12, 24]}>
                                <Col span={6} style={{ fontWeight: 'bold', color: `${this.state.color}` }}>Recommendations</Col>
                                <Divider style={{ background: item.color }}></Divider>
                              </Row>
                            ) : null}


                          {/* first  */}
                          {this.state.recommendationsArr[
                            arrIndex
                          ].recommendation.map((itemrec, index) => {
                            return (
                              <>
                                <div style={{ marginBottom: "1%" }}>
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
                                              backgroundColor: item.color,
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
                                        <Panel
                                          header={itemrec.title}
                                          key="1"
                                          style={customPanelStyle}
                                        >
                                          <p>{itemrec.detail}</p>
                                        </Panel>
                                      </Collapse>
                                    </Col>
                                  </Row>
                                </div>
                              </>
                            );
                          })}
                        </Row>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
          </div>
          <div style={{ marginBottom: "5%" }}></div>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          <div className="footerbar">
            <div className="logoF">
              <img
                src={fitlogo}
                style={{
                  width: "30px",
                  height: "30px",
                  marginBottom: "10px"
                }}
              />
            </div>
            <div className="powerby">
              <p>Powered by carnelian</p>
            </div>
          </div>
        </Footer>
      </Layout>
    );
  }
}
export default Scores;
