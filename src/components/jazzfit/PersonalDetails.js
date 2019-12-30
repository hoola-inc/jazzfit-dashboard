import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Button,
  DatePicker,
  Icon,
  message,
  Divider
} from "antd";
import axios from "axios";
import Swal from "sweetalert2";

function ontChange(value) {
  console.log("changed", value);
}
function onChange(date, dateString) {
  console.log(date, dateString);
}

const dateFormat = "YYYY-MM-DD";

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
    this.state = {
      value: "",
      name: "",
      userId: null,
      department: "",
      height: "",
      weight: "",
      email: "",
      dateOfBirth: "12-12-2012",
      confirmDirty: false,
      gender: "",
      totalAttempt: "",
      jwtToken: "",
      testArray: [],
      iconLoading: false,
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  componentMount() {
    axios
      .get(
        "https://jazzfit-api.herokuapp.com/refreshtoken/" + this.state.userId
      )
      .then(response => {
        console.log("token", response.data.data);
        this.setState({
          jwtToken: response.data.data
        });
      })
      .catch(error => {});
  }

  // onChange(e) {
  //   const re = /^\d*\.?\d*$/;
  //   if(re.test(e.target.value)) {
  //     console.log('done...');
  //     this.setState({ [e.target.name]: e.target.value });
  //   } else {
  //     console.log('lol...');
  //   }
  // }
  onChange(e) {
    // [0-9]+\' ?[0-9]+\" /^[0-9]*\.?[0-9]*$/;
    // const re = /^([0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const re = /^[3-8]{0,1}.[3-8]{0,1}$/;

    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  onDepartmentChange = e => {
    e.preventDefault();
    const re = /^[a-zA-Z]{0,100}$/;
    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
  };
  onempIdChange = e => {
    e.preventDefault();
    const re = /^[0-9]{0,20}$/;
    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
    console.log (";;;;;;;;;",this.state.userId +"    e cvalue "+e.target.value)
  };
  onheightChange = e => {
    e.preventDefault();
    const re = /^[1-9.]{0,3}$/;
    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onweightChange = e => {
    e.preventDefault();
    const re = /^[0-9]{0,3}$/;
    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onEmailChange(e) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{0,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  ChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  submitHandler = () => {
    // e.preventDefault();
    this.componentMount();
    console.log("token", this.state.jwtToken + "empId " + this.state.userId);
    axios
      .get("https://jazzfit-api.herokuapp.com/checkemp/" + this.state.userId)
      .then(response => {
        if (response.data.status) {
          console.log('::::::::::::::::::::::::   ', this.state.userId);
          console.log("totalAttempt",response.data.data[0].totalAttempt);
          if (response.data.data[0].totalAttempt === 0) {
            localStorage.setItem("empID", this.state.userId);
            Swal.fire(
              "",
              "You have not completed the survey please fill again !",
              "info"
            );
            this.props.myNext1();
          } else {
            localStorage.setItem("empID", this.state.userId);
            Swal.fire("Good job!", "You have completed the survey !", "info");
            this.props.myNext1();
            this.props.myNext1();
          }
        } else {
          const myData = {
            empName: this.state.name,
            empId: this.state.userId,
            department: this.state.department,
            height: this.state.height,
            weight: this.state.weight,
            email: this.state.email,
            dateOfBirth: "21/05/1988",
            gender: this.state.gender,
            totalAttempt: 0
          };
          console.log("this is submit calling", myData);
          axios({
            method: "post",
            url: "https://jazzfit-api.herokuapp.com/emp/",
            data: myData
          })
            .then(response => {
              console.log(response.data.jwtToken);
              console.log("response.data.success is: ", response.data.status);

              if (response.data.status === true) {
                message.success("user added successfully");
                localStorage.setItem("empID", response.data.data.empId);
                localStorage.setItem("totalAttempt", 0);
                this.props.myNext1();
              
                this.setState({
                  iconLoading: false,
                  loading: false
                });
              }
            })
            .catch(error => {
              console.log(error.message);
              Swal.fire("Ooppss!", "Something went wrong try again!", "error");
            });
          this.setState({
            iconLoading: false,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire("Ooppss!", "Something went wrong try again!", "error");
        this.setState({
          iconLoading: false,
          loading: false
        });
      });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  onButtonclick = e => {
    e.preventDefault();
    console.log("value of button ", e.currentTarget.value);
    this.setState({
      gender: e.currentTarget.value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
    const {
      name,
      userId,
      department,
      email,
      dateOfBirth,
      height,
      weight
    } = this.state;
    const pressed = "primary";

    return (
      <Row>
        <Row>
          {/*   span={8} offset={1}*/}
          <Col
            xs={{ span: 23, offset: 1 }}
            lg={{ span: 8, offset: 1 }}
            style={{ margin: "1%" }}
          >
            <h3
              className="personal-details-text"
              style={{ textAlign: "start" }}
            >
              Please enter the required details to complete your profile{" "}
              {this.state.name}
            </h3>
          </Col>
        </Row>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            onSubmit={this.submitHandler}
          >
            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Full Name</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item hasFeedback>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Full Name"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      size="large"
                      name="name"
                      ////disabled
                      placeholder="Danyal Shaikh"
                      value={this.state.name}
                      // {this.state.name}
                      onChange={this.ChangeHandler}
                      ref={this.myVideo}
                    />
                  )}
                </Form.Item>
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Id</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item hasFeedback>
                  {getFieldDecorator("ID", {
                    rules: [
                      {
                        required: true,
                        message: "Please Enter Employee ID"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      size="large"
                      name="userId"
                      ////disabled
                      placeholder="112225"
                      // {this.state.userId}
                      value={this.state.userId}
                      onChange={this.onempIdChange}

                    ></Input>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Department</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item>
                  <Input
                    type="text"
                    size="large"
                    name="department"
                    //disabled
                    placeholder="Development"
                    value={this.state.department}
                    onChange={this.onDepartmentChange}
                  ></Input>
                </Form.Item>
              </div>
            </div>

            <div className="paddingDivone"></div>
            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Date Of Birth</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item>
                  {/* {getFieldDecorator(
                      "date-picker",
                      config
                    )(
                      // <DatePicker defaultValue={this.state.dateOfBirth} //disabled  style={{ width: "100%" }}/>
                      <DatePicker
                        onChange={onChange}
                        size="large"
                        name="dateOfBirth"
                        value={this.state.dateOfBirth}
                        //disabled  
                        style={{ width: "100%" }}
                      />
                    )} */}
                  <Input
                    type="text"
                    size="large"
                    name="dateOfBirth"
                    //disabled
                    placeholder="1965-05-15"
                    value={this.state.dateOfBirth}
                    onChange={this.onChange}
                  ></Input>
                </Form.Item>
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Gender</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item style={{ width: "100%" }}>
                  <Button
                    type="dashed"
                    size="large"
                    value="Male"
                    style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    onClick={this.onButtonclick}
                  >
                    Male
                  </Button>
                  <Button
                    type="dashed"
                    size="large"
                    value="Female"
                    style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    onClick={this.onButtonclick}
                  >
                    Female
                  </Button>
                  <Button
                    type="dashed"
                    size="large"
                    value="Other"
                    style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    onClick={this.onButtonclick}
                  >
                    Other
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            onSubmit={this.submitHandler}
          >
            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Email</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item hasFeedback>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ paddingTop : "9px" }}/>}
                     
                      placeholder="Enter Email Address"
                      name="email"
                      size="large"
                      //disabled
                      placeholder="dev@hoola.tech"
                      required
                      value={this.state.email}
                      onChange={this.onEmailChange}
                    ></Input>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="paddingDiv"></div>

            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Height</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item>
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 8 }}
                    className="flex-container"
                  >
                    <Input
                      type="text"
                      size="large"
                      placeholder="e.g 5.10"
                      name="height"
                      value={this.state.height}
                      onChange={this.onheightChange}
                    />
                  </Col>
                </Form.Item>
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Weight</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item>
                  <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                    <Input
                      type="text"
                      
                      size="large"
                      value={this.state.weight}
                      placeholder="e.g 67kg"
                      name="weight"
                      onChange={this.onweightChange}
                    ></Input>
                  </Col>
                  {/* TODO change here  */}
                </Form.Item>
              </div>
            </div>
            <div>
              <Button
                type="primary"
                icon="arrow-right"
                size="large"
                className ="firstScreenButton"
                loading={this.state.iconLoading}
                onClick={() => {
                  this.enterIconLoading();
                  this.submitHandler();
                }}
              >
                Proceed To Next Step
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}
const wrappedPersonalDetails = Form.create()(PersonalDetails);
export default wrappedPersonalDetails;
