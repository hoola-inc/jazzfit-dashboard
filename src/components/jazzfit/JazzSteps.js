import React from "react";
// import { Steps, Button, message, h1 } from "antd";
import Tests from './Tests';
import {Steps, Form, Input, Row, Col, Button, DatePicker, Icon, message } from "antd";
import axios from "axios";
import PersonalDetails from "./PersonalDetails";
import Questionnaire from "./Questionnaire";
import PostForm from "../common/PostForm";
// import PersonDetail from "../jazzfit/PersonalDetails";


const { Step } = Steps;

let Titles = [
  (
  <div>
    <h3>Personal Details</h3>
    <p className="steps-tags">Some general information <br/> about you.</p>
  </div>
  ),
  (
  <div>
    <h3>Questionnaire</h3>
    <h4 className="steps-tags">Follow-up questions about <br/>your lifestyle.</h4>
  </div>
  ),
  (
  <div>
    <h3>Results</h3>
    <p className="steps-tags"> Detailed wellness report <br/> based on you answers.</p>
  </div>
  )
];

let firstContent = (
  <div style={{backgroundColor: '#fff', padding: 50, marginBottom: 20}}>
      <PersonalDetails />
  </div>
 
  );
  let secondContent = (
    <div style={{backgroundColor: '#fff', padding: 50, marginBottom: 20}}>
        <Questionnaire/>
    </div>
   
    );
    let lastContent = (
      <div style={{backgroundColor: '#fff', padding: 50, marginBottom: 20}}>
          <PostForm/>
      </div>
     
      );
  

const steps = [
  {
    title: Titles[0],
    content: firstContent
  },
  {
    title: Titles[1],
    content: secondContent,
  },
  {
    title: Titles[2],
    content: lastContent,
  }
];

class JazzSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    // this.props.check();
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <div >
          <h1 style={{ fontWeight: "bold",margin: "0 0 1% 0", fontSize: 40}}>Welcome , Danyal</h1>
          <h3 className="steps-tags" style={{ margin: "0 0 1% 0", fontSize: 20 }}>
            Your Wellness Journey begins here. Follow the steps below to proceed.
          </h3>
        </div>
        <Steps current={current} style={{ marginTop:50 }}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button
              type="primary"
              icon="arrow-right"
              onClick={() => this.next()}
              style={{ marginLeft: "80%" }}
            >
              Proceed to Next Step
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="dashed"
              onClick={() => message.success("Processing complete!")}
            >
              Next Question
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
        
      </div>
    );
  }
}
export default JazzSteps;
