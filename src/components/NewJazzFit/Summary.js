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
  Collapse,
  Icon
} from "antd";
import SummaryCard from "./ReportCards/SummaryCard";
import ProCharts from "../charts/ProCharts";
import SvgChart from "../charts/SvgChart";
import { renderToString } from "react-dom/server";
// import PDF, { Text, AddPage, Line, Image, Table, Html } from "jspdf-react";
import physical from "../drawables/physical.png";
import mental from "../drawables/mental.png";
import emotional from "../drawables/emotional.png";
import social from "../drawables/social.png";
import jazzfitLogo from "../drawables/fitlogo.png";
import carnelianLogo from '../drawables/logo.png';
// import PDFDocument from './gen-pdf-test';
import {
  Font,
  Text,
  Document,
  Page,
  Image,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink
} from "@react-pdf/renderer";
const fitlogo = require("../drawables/logo.png");



const { Footer } = Layout;

const { Panel } = Collapse;
const monthNames = [
  "January ",
  "February ",
  "March ",
  "April ",
  "May ",
  "June ",
  "July ",
  "August ",
  "September ",
  "October ",
  "November ",
  "December "
];
let OverAllText = "";
let anArr = [];
let PhysicalText = "";
let PhysicalScore = 0;
let PhysicalArr = [];
let PhysicalDataArr = [];

const Prints = () => (
  <div>
    <Layout style={{ marginTop: "5%", padding: "0% 3%", background: "#fff" }}>
      <div style={{ background: "#fff" }}>
        <Row gutter={24}>
          <Col span={6} offset={1} style={{ padding: "0% 1%" }}>
            Summary {monthNames[new Date().getMonth()]} {new Date().getDate()} ,{" "}
            {new Date().getFullYear()}
          </Col>
          <Divider>
            _______________________________________________________________________________________________
          </Divider>
        </Row>
        <div style={{ marginTop: "64px" }}></div>
        <Row gutter={24}>
          {/* <Col span={6} style={{ padding: "0% 1%" }}>
            <h3> Employee Name : Adeel</h3> <h3> Department : Hoola Dev</h3>
          </Col> */}
        </Row>
        <div style={{ margin: "1% 4% 0% 4%" }} className="box-shadow">
          <Row gutter={24}>
            <Col span={12} offset={1}>
              <h1 style={{ marginTop: "1.2%" }}> OverAll Score </h1>
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
              {anArr.map(brand => (
                <p>{brand}</p>
              ))}
            </Col>
            <Divider>
              _______________________________________________________________________________________________
            </Divider>
          </Row>
        </div>
      </div>
    </Layout>
  </div>
);

const PageTwo = () => (
  <div>
    <Layout>
      <Row gutter={24} style={{ marginTop: "2%" }}>
        {/* Physical Card */}
        <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Row gutter={[48, 48]}>
            <Col xs={{ span: 4 }} lg={{ span: 2 }}></Col>
            <Col span={12}>
              <h1 className="font-weight-sixteen">Physical Wellness</h1>
              <Col span={6}>
                <Progress
                  type="circle"
                  percent={PhysicalScore}
                  strokeColor="#1da336"
                  strokeWidth="7"
                  width={100}
                  style={{ margin: "0px 10px 10px 30px" }}
                />
              </Col>
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
                {PhysicalArr.map(brand => (
                  <p>{brand}</p>
                ))}
              </Col>

              <Divider>
                _______________________________________________________________________________________________
              </Divider>
              {PhysicalDataArr.map((physical, index) => {
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
                            <h1 className="font-weight-sixteen">
                              ANS: {physical.answer}
                            </h1>
                            <Divider style={{ background: "#bfd632" }}></Divider>
                          </Col>
                        </Row>
                        {physical.recommendation.length === 0 ? (
                          ""
                        ) : (
                            <div>
                              <Row gutter={24}>
                                <Col span={24}>
                                  <h3>Recommendations</h3>
                                  <h3>
                                    {physical.recommendationTitle}
                                    {/* Sleep is essential for your physical
                                  wellbeing. On-going sleep deficiency can add
                                  to your stress and anxieties. Here are a few
                                  tips that can help you get good sleep. */}
                                  </h3>
                                  {physical.recommendation.map((data, index) => {
                                    return (
                                      <div>
                                        <p>{data.detail}</p>
                                      </div>
                                    );
                                  })}
                                </Col>
                              </Row>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
          </Row>
        </Col>
      </Row>
    </Layout>
  </div>
);

const PageThree = () => (
  <body>
    <div className="pdf-container">
      <div className="pdf-text">
        <span style={{ fontWeight: "600" }}>Physical Wellness</span>
      </div>
      <div className="pdf-para">
        <div className="para">
          <span>
            You are not managing your physical wellbeing; certain aspects of
            your life need to be addressed soon or your energy will further drop
            which will likely lead to adverse consequences for your health and
            social life. To improve your physical wellbeing, follow the
            recommendations below.
          </span>
        </div>
        <div className="img">
          <span>IMAGE</span>
        </div>
      </div>
      <div className="pdf-sleep">
        <div className="sleep-heading">
          <span>Sleep</span>
        </div>
        <div className="sleep-text">
          <span>
            Sleep is essential for your physical wellbeing. On-going sleep
            deficiency can add to your stress and anxieties. Here are a few tips
            that can help you get good sleep.
          </span>
        </div>
      </div>
    </div>
  </body>
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
      iconLoading: false,
      template: null,

      // pdf states
      totalWellnessTextForPdf: null,
      physicalWellnessTextForPdf: '',
      mentalWellnessTextForPdf: '',
      emotionalWellnessTextForPdf: '',
      socialWellnessTextForPdf: '',
      mentalScoreForPdf: 0,
      totalScoreForPdf: 0,
      emotionalScoreForPdf: 0,
      physicalScoreForPdf: 0,
      socialScoreForPdf: 0
    };
  }
  addNewlines = str => {
    var result = "";
    while (str.length > 0) {
      result += str.substring(0, 200) + "<br />";
      str = str.substring(200);
    }
    return result;
  };

  showConsole = str => {
    // // console.log(str);
  };

  componentDidMount() {



    const empid = localStorage.getItem("empID");
    // // console.log("emp id", empid);

    axios
      .get("https://jazzfit-api.herokuapp.com/refreshtoken/" + empid)
      .then(response => {
        // // console.log(response);
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

              if (response.data.status) {
                this.setState({
                  totalScore: response.data.data[0],


                  totalWellnessTextForPdf: response.data.data[0].totalWellnessText,
                  physicalWellnessTextForPdf: response.data.data[0].physicalWellnessText,
                  mentalWellnessTextForPdf: response.data.data[0].mentalWellnessText,
                  socialWellnessTextForPdf: response.data.data[0].socialWellnessText,
                  emotionalWellnessTextForPdf: response.data.data[0].emotionalWellnessText,

                  totalScoreForPdf: response.data.data[0].totalScore,
                  emotionalScoreForPdf: response.data.data[0].emotionalScore,
                  physicalScoreForPdf: response.data.data[0].physicalScore,
                  socialScoreForPdf: response.data.data[0].socialScore,
                  mentalScoreForPdf: response.data.data[0].mentalScore,




                });
                // // console.log("totalWellnessText   :::   ", this.state.totalScore);
              }
            })
            .catch(error => {
              // // console.log(error.message);
            });
          // rescomendatioan
          axios
            .get("https://jazzfit-api.herokuapp.com/recommendations/" + empid, {
              headers: headers
            })
            .then(response => {
              // // console.log("recomendations ", response.data);
              if (response.data.status) {
                response.data.data.map(data => {
                  if (data.wellnessType === "physical") {
                    // // console.log("physical wellness type => ", data);
                    this.setState({
                      physicalData: this.state.physicalData.concat(data)
                    });
                    // console.log('Recommendations HAHAHA ::: ', this.state.physicalData);
                  }
                  if (data.wellnessType === "emotional") {
                    // // console.log("ddata .wellner tuyp ", data);
                    this.setState({
                      emotionalData: this.state.emotionalData.concat(data)
                    });
                  }
                  if (data.wellnessType === "social") {
                    // // console.log("ddata .wellner tuyp ", data);
                    this.setState({
                      socialData: this.state.socialData.concat(data)
                    });
                  }
                  if (data.wellnessType === "mental") {
                    // // console.log("ddata .wellner tuyp ", data);
                    this.setState({
                      mentalData: this.state.mentalData.concat(data)
                    });
                  }
                });

                this.setState({
                  recomendations: response.data.data[0],
                  physicalScore: this.state.totalScore.physicalScore
                });
                // // console.log('YO ::: ', this.state.socialData);
              }
            })
            .catch(error => {
              // // console.log(error.message);
            });
          this.setState({
            jwtToken: response.data.data
          });
        }
      })
      .catch(error => {
        // // console.log(error);
      });


  }











  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  // _exportPdf = () => {
  //   this.enterIconLoading();
  //   this.setState({ iconLoading: true });

  //   html2canvas(document.querySelector("#root")).then(canvas => {
  //     document.body.appendChild(canvas); // if you want see your screenshot in body.
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "em", "a4");
  //     let width = pdf.internal.pageSize.getWidth();

  //     pdf.setFontSize(40);
  //     // pdf.text("Octonyan loves jsPDF", 35, 25);
  //     // pdf.text('Foo', 55, 55);

  //     // pdf.addImage('examples/images/Octonyan.jpg', 'JPEG', 15, 40, 180, 180);
  //     const height = pdf.internal.pageSize.getHeight();
  //     pdf.addImage(imgData, "PNG", 0, 0, width, height / 1.8);
  //     const today = new Date().toISOString().slice(0, 10);
  //     pdf.save(`${today}-total-score.pdf`);
  //     this.setState({ iconLoading: false });
  //   });
  // };






  Quixote = () => (
    <Document>
      <Page style={this.pdfStyle.body}>
        <Image
          style={this.pdfStyle.image}
          src={jazzfitLogo}
        />
        <Text style={this.pdfStyle.topTitle}>
          Wellness Summary
        </Text>

        <Text style={this.pdfStyle.title}> Total Wellness </Text>
        <Text style={this.pdfStyle.score}>Score: {this.state.totalScoreForPdf}</Text>
        <Text style={this.pdfStyle.text}>
          {this.state.totalWellnessTextForPdf}
        </Text>

        <Text style={this.pdfStyle.title}> Physical Wellness </Text>
        <Text style={this.pdfStyle.score}>Score: {this.state.physicalScoreForPdf}</Text>
        <Text style={this.pdfStyle.text}>
          {this.state.physicalWellnessTextForPdf}
        </Text>


        <Text style={this.pdfStyle.title}> Mental Wellness </Text>

        <Text style={this.pdfStyle.score}> Score: {this.state.mentalScoreForPdf} </Text>

        <Text style={this.pdfStyle.text}>
          {this.state.mentalWellnessTextForPdf}
        </Text>

        <Text style={this.pdfStyle.title}> Social Wellness </Text>

        <Text style={this.pdfStyle.score}>Score: {this.state.socialScoreForPdf}</Text>

        <Text style={this.pdfStyle.text}>
          {this.state.socialWellnessTextForPdf}
        </Text>

        <Text style={this.pdfStyle.title}> Emotional Wellness </Text>
        <Text style={this.pdfStyle.score}> Score: {this.state.emotionalScoreForPdf} </Text>
        <Text style={this.pdfStyle.text}>
          {this.state.emotionalWellnessTextForPdf}
        </Text>


        <Text style={this.pdfStyle.topTitleNextPage}> Wellness Recommendations </Text>
        <Text style={this.pdfStyle.wellnessTitle}> Physical Wellness </Text>
        <Text style={this.pdfStyle.score}>Score: {this.state.physicalScoreForPdf}</Text>


        {
          this.state.physicalData.map((data, index) => {
            return (
              <>
                <Text style={this.pdfStyle.questionTitle}> Question {index + 1} </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.question}
                </Text>
                <Text style={this.pdfStyle.questionTitle}> Answer </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.answer}
                </Text>
                <Text style={this.pdfStyle.title}> Recommendations </Text>
                {
                  data.recommendation.map((recom, i) => {
                    return (
                      <>
                        <Text style={this.pdfStyle.text}>
                          {i + 1} {": "}{recom.title} {recom.detail}
                        </Text>

                      </>
                    )
                  })
                }
                <Text style={this.pdfStyle.textRecommendation}></Text>
              </>
            )
          })
        }



        <Text style={this.pdfStyle.wellnessTitle}> Emotional Wellness </Text>
        <Text style={this.pdfStyle.score}>Score: {this.state.physicalScoreForPdf}</Text>


        {
          this.state.emotionalData.map((data, index) => {
            return (
              <>
                <Text style={this.pdfStyle.questionTitle}> Question {index + 1} </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.question}
                </Text>
                <Text style={this.pdfStyle.questionTitle}> Answer </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.answer}
                </Text>
                <Text style={this.pdfStyle.title}> Recommendations </Text>
                {
                  data.recommendation.map((recom, i) => {
                    return (
                      <>
                        <Text style={this.pdfStyle.text}>
                          {i + 1} {": "}{recom.title} {recom.detail}
                        </Text>

                      </>
                    )
                  })
                }
                <Text style={this.pdfStyle.textRecommendation}></Text>
              </>
            )
          })
        }

        <Text style={this.pdfStyle.wellnessTitle}> Social Wellness </Text>
        <Text style={this.pdfStyle.score}>Score: {this.state.physicalScoreForPdf}</Text>


        {
          this.state.socialData.map((data, index) => {
            return (
              <>
                <Text style={this.pdfStyle.questionTitle}> Question {index + 1} </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.question}
                </Text>
                <Text style={this.pdfStyle.questionTitle}> Answer </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.answer}
                </Text>
                <Text style={this.pdfStyle.title}> Recommendations </Text>
                {
                  data.recommendation.map((recom, i) => {
                    return (
                      <>
                        <Text style={this.pdfStyle.text}>
                          {i + 1} {": "}{recom.title} {recom.detail}
                        </Text>

                      </>
                    )
                  })
                }
                <Text style={this.pdfStyle.textRecommendation}></Text>
              </>
            )
          })
        }

        <Text style={this.pdfStyle.wellnessTitle}> Mental Wellness </Text>
        <Text style={this.pdfStyle.score}>Score: {this.state.physicalScoreForPdf}</Text>


        {
          this.state.mentalData.map((data, index) => {
            return (
              <>
                <Text style={this.pdfStyle.questionTitle}> Question {index + 1} </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.question}
                </Text>
                <Text style={this.pdfStyle.questionTitle}> Answer </Text>
                <Text style={this.pdfStyle.textQuestion}>
                  {data.answer}
                </Text>
                <Text style={this.pdfStyle.title}> Recommendations </Text>
                {
                  data.recommendation.map((recom, i) => {
                    return (
                      <>
                        <Text style={this.pdfStyle.text}>
                          {i + 1} {": "} {recom.detail}
                        </Text>

                      </>
                    )
                  })
                }
                <Text style={this.pdfStyle.textRecommendation}></Text>
              </>
            )
          })
        }

        {/* <Text style={this.pdfStyle.pageNumber} render={({ pageNumber, totalPages }) => (
          <Image
            style={this.pdfStyle.image}
            src={carnelianLogo}
          />
        )} fixed /> */}

        <Image
          style={this.pdfStyle.imageBottom}
          src={carnelianLogo}
          fixed
        />

        <Text style={this.pdfStyle.footer} fixed> Powered By Carnelian </Text>

        {/* <Text style={this.pdfStyle.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed /> */}

      </Page>
    </Document>
  );


  Fonts = Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

  pdfStyle = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    topTitle: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Oswald',
      color: 'crimson',
      marginBottom: '80px'
    },
    topTitleNextPage: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Oswald',
      color: 'crimson',
      marginBottom: '50px',
      marginTop: '50px'
    },
    title: {
      fontSize: 16,
      textAlign: 'left',
      fontFamily: 'Oswald',
      color: 'crimson'
    },
    recommendationTitle: {
      fontSize: 14,
      textAlign: 'left',
      fontFamily: 'Oswald',
      color: 'crimson'
    },
    text: {
      marginBottom: 100,
      margin: 12,
      fontSize: 12,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      color: '#959595'
    },
    image: {
      width: '40px',
      height: '40px',
      marginVertical: 15,
      marginHorizontal: 240
    },
    imageBottom: {
      width: '40px',
      height: '40px',
      position: 'absolute',
      bottom: 20,
      left: 280,
      right: 0
    },
    footer: {
      position: 'absolute',
      fontSize: 8,
      bottom: 10,
      left: 270,
      right: 0,
      fontFamily: 'Oswald',
      color: 'crimson'
    },
    score: {
      textAlign: 'right',
      fontSize: 12,
      color: 'crimson',
      position: 'relative',
      top: '-15px',
      marginRight: '20px'
    },
    totalScore: {
      textAlign: 'center',
      fontSize: 8,
      color: 'crimson',
      marginBottom: '50px'
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    recomendations: {
      marginBottom: '50px',
      margin: 12,
      fontSize: 12,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      color: '#959595'
    },
    underScore: {
      color: 'crimson'
    },
    questionTitle: {
      fontSize: 14,
      textAlign: 'left',
      fontFamily: 'Oswald',
      color: 'crimson'
    },
    textQuestion: {
      fontSize: 12,
      marginLeft: 12,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      color: '#959595',
      marginBottom: '5px'
    },
    textRecommendation: {
      marginBottom: '24px',
      marginBottom: '5px'
    },
    wellnessTitle: {
      fontSize: 18,
      textAlign: 'left',
      fontFamily: 'Oswald',
      color: 'crimson'
    }
  });




  render() {


    return (
      <Layout className="App">
        <Header />
        <Layout
          style={{ marginTop: "5%", padding: "0% 3%", background: "#fff" }}
        >
          <div ref="theChild" style={{ background: "#fff" }}>
            <Row gutter={24}>
              {/* <Button type="primary" onClick={this.print}>
                print
              </Button> */}
              <Col
                span={2}
                offset={1}
                style={{ padding: "0% 1%" }}
                className="font-weight-sixteen"
              >

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
                <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                  <h1
                    style={{ marginTop: "1.2%", padding: "3% 0% 0% 5%" }}
                    className="font-weight-sixteen"
                  >
                    Overall Score
                  </h1>
                  {/* <Button
                    type="primary"
                    onClick={this.print}
                    icon="download"
                    loading={this.state.iconLoading}
                    ghost
                  >
                    Generate PDF
                  </Button> */}

                  {(this.state.totalWellnessTextForPdf) ?
                    (
                      <PDFDownloadLink document={<this.Quixote />} fileName="total-summary.pdf" style={{ display: 'block', textAlign: 'right', position: 'relative', right: '175px', fontSize: '20px' }}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download pdf!')}
                      </PDFDownloadLink>
                    ) :
                    (
                      null
                    )}

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
                        color: 'crimson',
                        physical: this.state.totalScore.physicalScore,
                        emotional: this.state.totalScore.emotionalScore,
                        social: this.state.totalScore.socialScore,
                        mental: this.state.totalScore.mentalScore,
                        totalScore: this.state.totalScore.totalScore
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
                  lg={{ span: 12, offset: 4 }}
                  className="font-size-sixteen"
                  style={{ marginTop: '75px' }}
                >
                  {this.state.totalScore.totalWellnessText}
                </Col>
              </Row>
              {/* <Row>
                <Col
                  xs={{ span: 20, offset: 1 }}
                  lg={{ span: 2, offset: 1 }}
                  style={{ marginTop: "20px", marginBottom: "8px" }}
                >
                  You are in the 87th percentile and your score ranks 22nd.
                </Col>
              </Row> */}
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
                      background: "#bfd632",
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
                        strokeColor="#bfd632"
                        strokeWidth="7"
                        width={100}
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider style={{ background: "#bfd632" }}></Divider>
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
                                <Divider style={{ background: "#bfd632" }}></Divider>
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
                                      <Collapse
                                        bordered={false}
                                        expandIconPosition="right"
                                        expandIcon={({ isActive }) => (
                                          <Icon
                                            type="right"
                                            rotate={isActive ? -90 : 90}
                                            style={{
                                              backgroundColor: "#bfd632",
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
                                          header="Read More"
                                          type="link"
                                          style={{ fontWeight: 'bold' }}
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
                      background: "#ef4323",
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
                        strokeColor="#ef4323"
                        strokeWidth="7"
                        width={100}
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider style={{ background: "#ef4323" }}></Divider>
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
                                <Divider style={{ background: "#ef4323" }}></Divider>
                              </Col>
                            </Row>
                            {emotional.recommendation.length === 0 ? (
                              ""
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
                                      <Collapse
                                        bordered={false}
                                        expandIconPosition="right"
                                        expandIcon={({ isActive }) => (
                                          <Icon
                                            type="right"
                                            rotate={isActive ? -90 : 90}
                                            style={{
                                              backgroundColor: "#ef4323",
                                              color: "#fff",
                                              width: "500",
                                              height: "500",
                                              borderRadius: 100 / 2,
                                              width: " 20px",
                                              height: "20px",
                                              paddingTop: "0.5%"
                                            }}
                                          />
                                        )}>
                                        <Panel
                                          header="Read More"
                                          type="link"
                                          style={{ fontWeight: 'bold' }}
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
                      background: "#834291",
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
                        strokeColor="#834291"
                        strokeWidth="7"
                        width={100}
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider style={{ background: "#834291" }}></Divider>
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
                                <Divider style={{ background: "#834291" }}></Divider>
                              </Col>
                            </Row>
                            {mental.recommendation.length === 0 ? (
                              ""
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
                                      <Collapse
                                        bordered={false}
                                        expandIconPosition="right"
                                        expandIcon={({ isActive }) => (
                                          <Icon
                                            type="right"
                                            rotate={isActive ? -90 : 90}
                                            style={{
                                              backgroundColor: "#834291",
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
                                          header="Read More"
                                          type="link"
                                          style={{ fontWeight: 'bold' }}
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
                      background: "#18aeef",
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
                        strokeColor="#18aeef"
                        strokeWidth="7"
                        width={100}
                        style={{ margin: "0px 10px 10px 30px" }}
                      />
                    </Col>
                    <Divider style={{ background: "#18aeef" }}></Divider>
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
                                <Divider style={{ background: "#18aeef" }}></Divider>
                              </Col>
                            </Row>
                            {social.recommendation.length === 0 ? (
                              ""
                            ) : (
                                <div>
                                  <Row gutter={24}>
                                    <Col span={24}>
                                      <h3>{social.recommendationTitle}</h3>
                                    </Col>
                                  </Row>
                                  <Row gutter={24}>
                                    <Col span={24}>
                                      <Collapse
                                        bordered={false}
                                        expandIconPosition="right"
                                        expandIcon={({ isActive }) => (
                                          <Icon
                                            type="right"
                                            rotate={isActive ? -90 : 90}
                                            style={{
                                              backgroundColor: "#18aeef",
                                              color: "#fff",
                                              width: "500",
                                              height: "500",
                                              borderRadius: 100 / 2,
                                              width: " 20px",
                                              height: "20px",
                                              paddingTop: "0.5%"
                                            }}
                                          />
                                        )}>
                                        <Panel
                                          header="Read More"
                                          type="link"
                                          style={{ fontWeight: 'bold' }}
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
              <p>Powered by Carnelian</p>
            </div>
          </div>
        </Footer>
      </Layout >
    );
  }
}

export default Summary;
