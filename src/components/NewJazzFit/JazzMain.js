import React from "react";
import "../MyCSS/MyCss.css";
import Header from "../common/HeaderLayout";
import PersonalDetails from "../jazzfit/PersonalDetails";
import Questionnaire from "../jazzfit/Questionnaire";
import PostForm from "../common/PostForm";

import {
  Layout,
  Steps,
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Icon,
  message,
  Pagination,
  Divider,
  Radio,
  Typography
} from "antd";
import { ENGINE_METHOD_NONE } from "constants";
import Results from "./Results";
import Questions from "./Questions";

const { Content, Footer } = Layout;
const { Step } = Steps;
const size = "large";
const logo = require("../drawables/image1.png");

function NextState() {
  console.log("I m next state function");
}
class JazzMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      test: 0,
      section: 0,
      
    };
  }

  

  componentWillMount() {
    console.log("this is compent mount", this.state.current);
    this.setState({
      section: 0
    });
  }

  // Titles = [
  //   <div>
  //     <h3>Personal Details</h3>
  //     <p className="steps-tags">
  //       Some general information <br /> about you.
  //     </p>
  //   </div>,
  //   <div>
  //     <h3>Questionnaire </h3>
  //     <h4 className="steps-tags">
  //       Follow-up questions about <br />
  //       your lifestyle.
  //     </h4>
  //   </div>,
  //   <div>
  //     <h3>Results</h3>
  //     <p className="steps-tags">
  //       Detailed wellness report <br /> based on you answers.
  //     </p>
  //   </div>
  // ];

  // Titles1 = [
  //   <div>
  //     <h3>Personal Details</h3>
  //     <p className="steps-tags">
  //       Some general information <br /> about you.
  //     </p>
  //   </div>,
  //   <div>
  //     <h3>Questionnaire </h3>
  //     <h5
  //       id="changeColor"
  //       className="steps-tags"
  //     >
  //       Physical
  //     </h5>
  //     <h5
  //       id="changeColor"
  //       className="steps-tags">
  //       Emotional
  //     </h5>
  //     <h5
  //       id="changeColor"
  //       className="steps-tags"
  //     >
  //       Mental
  //     </h5>
  //     <h5
  //       id="changeColor"
  //       className="steps-tags"
      
  //     >
  //       Social
  //     </h5>
  //   </div>,
  //   <div>
  //     <h3>Results</h3>
  //     <p className="steps-tags">
  //       Detailed wellness report <br /> based on you answers.
  //     </p>
  //   </div>
  // ];

  firstContent = (
    <div
      className="content-style"
      style={{ backgroundColor: "#fff", padding: "2% 10% -6% 0" }}
    >
      <PersonalDetails myNext1={() => this.myNext()} />
    </div>
  );
  // myNext1 = {(d) =>this.myNext(d)}
  secondContent = (
    <div
      className="content-style"
      style={{ backgroundColor: "#fff", padding: "2% 10% -6% 0" }}
    >
      <Questions
        myNext1={() => this.myNext()}
        onChangeColor={e => this.onChangeColor(e)}
      />
    </div>
  );
  lastContent = (
    <div
      className="content-style"
      style={{ backgroundColor: "#fff", padding: "2% 10%" }}
    >
      <Results />
    </div>
  );
  myNext = () => {
    console.log("value of d ");
    const e = this.state.current + 1;
    this.setState({
      current: e
    });
  };

  onChangeColor = e => {
    console.log("value of e ", e);
    this.cSection = e;
    this.setState({
      section: e
    });
    console.log("value of section state ", this.state.section);
    return e;
  };

  // onChangeColor = () => {
  //   // document.getElementById("changeColor").style.color = 'blue';
  // };
  next = () => {
    const current1 = this.state.current + 1;

    this.setState({
      current: current1
    });
    console.log("next current value", this.state.current);
  };

  changeTitle() {
    if (this.state.current !== 0) {
      console.log("change title state", this.Titles[this.state.current]);
      return `dadaadad`;
    } else {
      console.log("change title state", this.Titles[this.state.current]);
      return "dududuudu";
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  ChangeHandler = e => {};

  // steps = [
  //   {
  //     title: this.Titles[0],
  //     content: this.firstContent
  //   },
  //   {
  //     title: this.Titles[1],
  //     content: this.secondContent
  //   },
  //   {
  //     title: this.Titles[2],
  //     content: this.lastContent
  //   }
  // ];
  // steps1 = [
  //   {
  //     title: this.Titles1[0],
  //     content: this.firstContent
  //   },
  //   {
  //     title: this.Titles1[1],
  //     content: this.secondContent
  //   },
  //   {
  //     title: this.Titles1[2],
  //     content: this.lastContent
  //   }
  // ];

  render() {
    const { current, section } = this.state;
    const Titles = [
      <div>
        <h3>Personal Details</h3>
        <p className="steps-tags">
          Some general information <br /> about you.
        </p>
      </div>,
      <div>
        <h3>Questionnaire </h3>
        <h4 className="steps-tags">
          Follow-up questions about <br />
          your lifestyle.
        </h4>
      </div>,
      <div>
        <h3>Results</h3>
        <p className="steps-tags">
          Detailed wellness report <br /> based on you answers.
        </p>
      </div>
    ];
    const Titles1 = [
      <div>
        <h3>Personal Details</h3>
        <p className="steps-tags">
          Some general information <br /> about you.
        </p>
      </div>,
      <div>
        <h3>Questionnaire </h3>
        <h5
          id="changeColor"
          className="steps-tags"
          style={{
            color: section === 0 ? "#c4161c" : "#a7a9ac",marginBottom :"1px"
          }}
        >
          Physical
        </h5>
        <h5
          id="changeColor"
          className="steps-tags"
          style={{
            color: section === 1 ? "#c4161c" : "#a7a9ac",marginBottom :"1px"
          }}
        >
          Emotional
        </h5>
        <h5
          id="changeColor"
          className="steps-tags"
          style={{
            color: section === 2 ? "#c4161c" : "#a7a9ac",marginBottom :"1px"
          }}
        >
          Mental
        </h5>
        <h5
          id="changeColor"
          className="steps-tags"
          style={{
            color: section === 3 ? "#c4161c" : "#a7a9ac",marginBottom :"1px"
          }}
        >
          Social
        </h5>
      </div>,
      <div>
        <h3>Results</h3>
        <p className="steps-tags">
          Detailed wellness report <br /> based on you answers.
        </p>
      </div>
    ];

    const steps = [
      {
        title: Titles[0],
        content: this.firstContent
      },
      {
        title: Titles[1],
        content: this.secondContent
      },
      {
        title: Titles[2],
        content: this.lastContent
      }
    ];

    const steps1 = [
      {
        title: Titles1[0],
        content: this.firstContent
      },
      {
        title: Titles1[1],
        content: this.secondContent
      },
      {
        title: Titles1[2],
        content: this.lastContent
      }
    ];
    return (
      <Layout>
        <Row gutter={24}>
          <Col span={24}>
            <Header />
          </Col>
        </Row>

        <Layout>
          <Row>
            <Col span={24}>
              <div className="steps-action">
                <Row gutter={24}>
                  <Col span={24}>
                    <div className="topbar">
                      <Row>
                        <Col>
                          <h1
                            style={{
                              fontWeight: "bold",
                              margin: "0 0 1% 0",
                              fontSize: 40
                            }}
                          >
                            Welcome !
                          </h1>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h3
                            style={{
                              margin: "0 0 1% 0",
                              fontSize: 20,
                              color: "#808285"
                            }}
                          >
                            Your Wellness Journey begins here. Follow the steps
                            below to proceed.
                          </h3>
                        </Col>
                      </Row>
                      <Row gutter={24}>
                        <Col span={24}>
                          {(() => {
                            if (this.state.current === 0) {
                              return (
                                <div visible={false}>
                                  <Steps current={this.state.current}>
                                    {steps.map(item => (
                                      <Step
                                        key={item.title}
                                        title={item.title}
                                      />
                                    ))}
                                  </Steps>
                                </div>
                              );
                            } else if (this.state.current === 1) {
                              return (
                                <Steps current={this.state.current}>
                                  {steps1.map(item => (
                                    <Step key={item.title} title={item.title} />
                                  ))}
                                </Steps>
                              );
                            } else {
                              return (
                                <Steps current={this.state.current}>
                                  {steps.map(item => (
                                    <Step key={item.title} title={item.title}  />
                                  ))}
                                </Steps>
                              );
                            }
                          })()}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <div className="steps-content">
                  {steps[this.state.current].content}
                  {this.state.current === 0 && (
                    <div className="firstscreenbutton">
                      {/* <Button
                        type="primary"
                        icon="arrow-right"
                        onClick={() => this.next()}
                        size="large"
                        style={{ width: "200%" }}
                      >
                        Proceed to Next
                      </Button> */}
                    </div>
                  )}
                  {this.state.current === 1 && (
                    <div className="secondscreenbutton">
                      {/* <Button
                        type="primary"
                        icon="arrow-right"
                        onClick={() => this.next()}
                        size="large"
                        style={{ width: "100%" }}
                      >
                        Next Question
                      </Button> */}
                    </div>
                  )}
                  {/* <div style={{ backgroundColor: "white", padding: "0 0 0% 0", textAlign: 'center', position: "absolute", top: "90%", right: "30%" }}>
               
                 
                  {current === this.steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => message.success("Processing complete!")}
                      style={{ marginLeft: "60%" }}
                    >
                      Done
                    </Button>
                  )} }
                  { {current > 0 && (
                    <Button
                      style={{ marginLeft: 8 }}
                      onClick={() => this.prev()}
                    >
                      Previous
                    </Button>
                  )}
                </div> */}
                </div>
              </div>
            </Col>
          </Row>
        </Layout>
      </Layout>
    );
  }
}

export default JazzMain;
