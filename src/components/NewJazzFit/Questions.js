import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Icon,
  Col,
  Divider,
  Pagination,
  Collapse,
  Radio,
  Card,
  Button,
  message
} from "antd";
import ProCharts from "../charts/ProCharts";
import axios from "axios";
import Swal from "sweetalert2";

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return null;
  }
  if (type === "next") {
    return null;
  }
  return originalElement;
}

export default class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BASEURL: "https://jazzfit-api.herokuapp.com/",
      page: 1,
      section: 0,
      checked: false,
      questionText: "",
      answerText: "",
      wellnessType: "",
      answerWeightage: 0,
      radioID: "",
      empId: 0,
      jwtToken: "",
      totalAttempt: 0,
      myarray: [],
      iconLoading: false,
      loading: false
    };
  }
  componentDidMount() {
    //// console.log("HIT!");
    const empid = localStorage.getItem("empID");
    //// console.log("local storage emp id", empid);
    this.setState({
      empId: parseInt(empid, 10)
    });
    //// console.log("state emp id", this.state.empId);

    axios
      .get("https://jazzfit-api.herokuapp.com/refreshtoken/" + empid)
      .then(response => {
        //// console.log("reesponse toke m ",response);
        if (response.data.status === true) {
          const headers = {
            "Content-Type": "application/json",
            "x-access-token": response.data.data
          };
          axios
            .get("https://jazzfit-api.herokuapp.com/questions", {
              headers: headers
            })
            .then(response => {
              //// console.log(response.data.data);
            })
            .catch(error => {
              //// console.log(error);
            });
          this.setState({
            jwtToken: response.data.data
          });
        }
      })
      .catch(error => {
        //// console.log(error);
      });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };
  onSectionChanged = () => {
    this.setState({
      iconLoading: false,
      loading: false
    });




    if (this.state.checked) {
      const myObject = {
        empId: this.state.empId,
        questionText: this.state.questionText,
        answerText: this.state.answerText,
        wellnessType: this.state.wellnessType,
        answerWeightage: this.state.answerWeightage,
        serialNumber: this.state.myarray.length,
        totalAttempt: 1
      };

      this.setState({
        myarray: this.state.myarray.concat(myObject)
      });
      // console.log("my array", this.state.myarray.length);
      const ques = this.state.page + 1;
      if (ques < 6) {
        //// console.log("Question Number", ques);
        this.setState({
          page: ques,
          checked: false
        });
      } else if (this.state.section < 3) {
        const newSection = this.state.section + 1;
        this.setState(
          {
            section: newSection,
            page: 1
          },
          () => {
            this.props.onChangeColor(this.state.section);
          }
        );
      } else if (this.state.section === 3 && this.state.page === 5) {
        // this.sendtoServer();
        this.setState(
          {
            section: 3,
            page: 5
          },
          () => {
            this.sendtoServer();
          }
        );
      }
    } else {
      message.warning("Make a Selection!");
    }
    // stArray[this.state.section].questions[this.state.page - 1].answers[this.onRadioClicked.id]._isSelected = false;
  };

  sendtoServer = () => {
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": this.state.jwtToken
    };
    if (this.state.myarray.length === 20) {
      this.enterIconLoading();
      axios
        .post("https://jazzfit-api.herokuapp.com/qa", this.state.myarray, {
          headers: headers
        })
        .then(response => {
          //// console.log("response ", response);
          if (response.status === 200) {
            this.onPatchAttempt();
          } else {
            Swal.fire(
              "",
              "There is an error kindly refill the survey !",
              "error"
            );
            this.setState({
              section: 0,
              page: 1,
              myarray: this.state.myarray.splice(0, this.state.myarray.length)
            });
          }
        })
        .catch(error => {
          //// console.log("error", error.message);
          this.state.myarray.splice(this.state.myarray.length - 1, 1);
          Swal.fire(
            "",
            "There is an error kindly refill the survey !",
            "error"
          );
          this.setState({
            section: 0,
            page: 1,
            myarray: this.state.myarray.splice(0, this.state.myarray.length)
          });
        });
    } else {
      Swal.fire(
        "",
        "There is an error kindly refill the survey !",
        "error"
      );
      this.setState({
        section: 0,
        page: 1,
        myarray: this.state.myarray.splice(0, this.state.myarray.length)
      });
      // // console.log("array ", this.state.myarray);
      // this.enterIconLoading();
      // this.onSectionChanged();
    }
  };

  onPatchAttempt = async token => {
    const url = `${this.state.BASEURL}emp/totalattempts/${this.state.empId}`;
    try {
      const headers = { "x-access-token": this.state.jwtToken };
      const myData = { totalAttempt: 2 };
      const response = await axios({
        method: "patch",
        url: url,
        data: myData,
        headers: headers
      });
      if (response.data.status) {
        message.success("Data Entered successfully");
        this.props.myNext1();
      }
    } catch (error) {
      message.error("bad request");
      // console.log("image response error", error);
    }
  };
  onRadioClicked = e => {
    this.setState({
      checked: true,
      questionText:
        stArray[this.state.section].questions[this.state.page - 1].question,
      answerText:
        stArray[this.state.section].questions[this.state.page - 1].answers[
          e.currentTarget.id - 1
        ].answer,
      wellnessType: stArray[this.state.section].section,
      answerWeightage:
        stArray[this.state.section].questions[this.state.page - 1].answers[
          e.currentTarget.id - 1
        ].weightage
    });

    //// console.log("Array length ", this.state.myarray.length);
    //// console.log(
    //   "Radio Clicked ",
    //   e.currentTarget.id +
    //     " Section :" +
    //     stArray[this.state.section].section +
    //     " , Question : " +
    //     stArray[this.state.section].questions[this.state.page - 1].question +
    //     "?  Answer :" +
    //     stArray[this.state.section].questions[this.state.page - 1].answers[
    //       e.currentTarget.id - 1
    //     ].answer +
    //     // testArray[this.state.page].answers[e.currentTarget.id - 1].answer +
    //     ", Weightage =  " +
    //     stArray[this.state.section].questions[this.state.page - 1].answers[
    //       e.currentTarget.id - 1
    //     ].weightage
    // );

    stArray[this.state.section].questions[this.state.page - 1].answers[
      e.currentTarget.id - 1
    ]._isSelected = true;
  };

  onChange = pageNumber => {
    this.setState({
      ...this.state,
      page: pageNumber
    });
  };

  render() {
    return (
      <div>
        <Row gutter={24}>
          {/* <Col xs={{ span: 24 }} lg={{ span: 6 }} className="box-shadow">
            <Row gutter={24}>
              <Col
                span={24}
                className="steps-headings"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
              >
                <Row>
                  <Col
                    className="font-weight-sixteen"
                    style={{ margin: "5% 40% 5% 5%" }}
                  >
                    Physical Wellness
                  </Col>
                </Row>
               
                <Divider style={{ margin: "0 0 0 0" }}></Divider>
                <Row>
                  <Col span={12}>
                    <ProCharts />
                  </Col>
                  <Col
                    span={10}
                    style={{ marginTop: "20%" }}
                    className="font-weight-fourteen"
                  >
                    You are in the 87th percentile and your <br />
                    score ranks 22nd .
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={20} style={{ marginLeft: "7%" }}>
                    <span
                      className="font-size-sixteen"
                      style={{ textAlign: "left" }}
                    >
                      <h4 className="font-size-sixteen">
                        A brief description and insights from your overall
                        wellness score and what it means. Further reading to
                        improve each category is also linked.
                        {this.state.myarray.length}
                      </h4>
                    </span>
                  </Col>
                </Row>
                <Row gutter={18}>
                  <Col span={24}>
                    <Link to="/summary">
                      <Col
                        span={12}
                        style={{ textAlign: "center", marginBottom: "5%" }}
                        className="font-size-sixteen-link"
                      >
                        Read Full Report
                      </Col>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col> */}
          <Col xs={{ span: 24 }} lg={{ span: 16, offset: 4 }}>
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                className="steps-headings"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
              >
                <h1
                  className="font-weight-sixteen"
                  style={{ textAlign: "start" }}
                >
                  Question :{this.state.page}
                </h1>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Pagination
                  current={this.state.page}
                  total={50}
                  style={{ margin: "1% 1% 1% 1%" }}
                  itemRender={itemRender}
                />
              </Col>
              <Divider></Divider>
              <Row gutter={24}>
                <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                  {/* <h1>{question[this.state.page]}</h1> */}
                  <h1
                    className="font-weight-sixteen"
                    style={{ textAlign: "start", marginBottom: "32px" }}
                  >
                    {/* {testArray[this.state.page].question} */}
                    {
                      stArray[this.state.section].questions[this.state.page - 1]
                        .question
                    }
                  </h1>
                </Col>

                <Row gutter={48} style={{ marginTop: "10px" }}>
                  {/* ROw of First set of answers */}
                  <Col span={24}>
                    <div className="box-radio" style={{ marginLeft: "1%" }}>
                      {/* test  */}

                      {stArray[this.state.section].questions[
                        this.state.page - 1
                      ].answers[0].visiblility ? (
                          <div id="custom-radio-btn">
                            <label className="_radio_btn" for="1">
                              <div className="_btn_content">
                                <span className="_btn_icon">
                                  <Icon type="right" />
                                </span>
                                <span className="_btn_text">
                                  {/* {testArray[this.state.page].answers[0].answer} */}
                                  {
                                    stArray[this.state.section].questions[
                                      this.state.page - 1
                                    ].answers[0].answer
                                  }
                                </span>
                              </div>
                              <input
                                type="radio"
                                name="ans1"
                                id="1"
                                onChange={this.onRadioClicked}
                                checked={
                                  stArray[this.state.section].questions[
                                    this.state.page - 1
                                  ].answers[0]._isSelected
                                }
                              />
                            </label>
                          </div>
                        ) : null}

                      {stArray[this.state.section].questions[
                        this.state.page - 1
                      ].answers[1].visiblility ? (
                          <div id="custom-radio-btn">
                            <label className="_radio_btn" for="2">
                              <div className="_btn_content">
                                <span className="_btn_icon">
                                  <Icon type="right" />
                                </span>
                                <span className="_btn_text">
                                  {/* {testArray[this.state.page].answers[1].answer} */}
                                  {
                                    stArray[this.state.section].questions[
                                      this.state.page - 1
                                    ].answers[1].answer
                                  }
                                </span>
                              </div>
                              <input
                                type="radio"
                                name="ans1"
                                id="2"
                                onChange={this.onRadioClicked}
                                checked={
                                  stArray[this.state.section].questions[
                                    this.state.page - 1
                                  ].answers[1]._isSelected
                                }
                              />
                            </label>
                          </div>
                        ) : null}
                      {/*  */}
                      {stArray[this.state.section].questions[
                        this.state.page - 1
                      ].answers[2].visiblility ? (
                          <div id="custom-radio-btn">
                            <label className="_radio_btn" for="3">
                              <div className="_btn_content">
                                <span className="_btn_icon">
                                  <Icon type="right" />
                                </span>
                                <span className="_btn_text">
                                  {/* {testArray[this.state.page].answers[2].answer} */}
                                  {
                                    stArray[this.state.section].questions[
                                      this.state.page - 1
                                    ].answers[2].answer
                                  }
                                </span>
                              </div>
                              <input
                                type="radio"
                                name="ans1"
                                id="3"
                                onChange={this.onRadioClicked}
                                checked={
                                  stArray[this.state.section].questions[
                                    this.state.page - 1
                                  ].answers[2]._isSelected
                                }
                              />
                            </label>
                          </div>
                        ) : null}
                      {/*  */}
                      {stArray[this.state.section].questions[
                        this.state.page - 1
                      ].answers[3].visiblility ? (
                          <div id="custom-radio-btn">
                            <label className="_radio_btn" for="4">
                              <div className="_btn_content">
                                <span className="_btn_icon">
                                  <Icon type="right" />
                                </span>
                                <span className="_btn_text">
                                  {
                                    stArray[this.state.section].questions[
                                      this.state.page - 1
                                    ].answers[3].answer
                                  }
                                </span>
                              </div>
                              <input
                                type="radio"
                                name="ans1"
                                id="4"
                                onChange={this.onRadioClicked}
                                checked={
                                  stArray[this.state.section].questions[
                                    this.state.page - 1
                                  ].answers[3]._isSelected
                                }
                              />
                            </label>
                          </div>
                        ) : null}
                      {/* test end */}
                    </div>
                    <Row gutter={24}>
                      <Col
                        xs={{ span: 24 }}
                        lg={{ span: 20, offset: 7 }}
                        md={{ span: 20, offset: 7 }}
                      >
                        <div>
                          <Button
                            type="primary"
                            icon="arrow-right"
                            size="large"
                            style={{}}
                            loading={this.state.iconLoading}
                            onClick={this.onSectionChanged}
                          // onClick={ () => {
                          //   this.props.myNext1(1)
                          //   this.onSectionChanged()}}
                          >
                            {this.state.myarray.length > 19
                              ? "Finish"
                              : "Next Question"}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const stArray = [
  {
    section: "physical",
    questions: [
      {
        question: "I get 7-8 hours of sleep everyday",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      },
      {
        question: "I eat a healthy breakfast everyday",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      },
      {
        question: "I exercise at least three days every week",
        answers: [
          {
            answer: "Yes",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "No",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },


          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "I smoke cigarettes/vapes/sheesha",
        answers: [
          {
            answer: "Yes",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "No",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "I drink at least 8 glasses of water every day",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      }
    ]
  },
  {
    section: "emotional",
    questions: [
      {
        question: "I find myself worrying about the future",
        answers: [
          {
            answer: "Yes",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "No",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "I mostly enjoy my work",
        answers: [
          {
            answer: "Yes",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "No",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },


          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "There is a big gap between what I say and what I do",
        answers: [
          {
            answer: "Yes",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "No",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "I easily lose my temper and become angry",
        answers: [
          {
            answer: "Never",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Sometimes",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "Often",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          }



        ]
      },
      {
        question: "I like taking risks and doing new things",
        answers: [
          {
            answer: "Yes",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "No",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },


          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      }
    ]
  },
  {
    section: "mental",
    questions: [
      {
        question: "I get distracted easily",
        answers: [
          {
            answer: "Never",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Sometimes",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          }
        ]
      },
      {
        question: "I care more about the long term goal than short term wins",
        answers: [
          {
            answer: "Yes",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "No",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },


          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "I come up with creative solutions to problems",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      },
      {
        question:
          "I take frequent breaks from my work throughout the day to think about other things",
        answers: [

          {
            answer: "Yes",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "No",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "I organize my tasks before starting my work",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      }
    ]
  },
  {
    section: "social",
    questions: [
      {
        question: "I am aware of the needs and concerns of my coworkers",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      },
      {
        question: "I don't spend enough time with my family",
        answers: [
          {
            answer: "Yes",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "No",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },


          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          },
          {
            answer: "",
            weightage: 0,
            _isSelected: false,
            visiblility: false
          }
        ]
      },
      {
        question: "I am quick to show my appreciation for others",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      },
      {
        question: "I am comfortable sharing my achievements with others",
        answers: [
          {
            answer: "Never",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          },

          {
            answer: "Sometimes",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          }
        ]
      },
      {
        question: "I find conflicts difficult to resolve",
        answers: [
          {
            answer: "Never",
            weightage: 100,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Sometimes",
            weightage: 60,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Often",
            weightage: 40,
            _isSelected: false,
            visiblility: true
          },
          {
            answer: "Always",
            weightage: 10,
            _isSelected: false,
            visiblility: true
          }




        ]
      }
    ]
  }
];
