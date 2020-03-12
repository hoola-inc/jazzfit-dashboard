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
  // console.log("changed", value);
}
function onChange(date, dateString) {
  // console.log(date, dateString);
}

const dateFormat = "YYYY-MM-DD";

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
    this.state = {
      value: "",
      Emp_Name: "",
      Emp_ID: null,
      Department: "",
      height: "",
      weight: "",
      Email: "",
      DOB: "12-12-2012",
      confirmDirty: false,
      Gender: "",
      totalAttempt: "",
      jwtToken: "",
      testArray: [],
      iconLoading: false,
      loading: false,
      empId: "",
      userServerData: []
    };
    this.onChange = this.onChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  componentDidMount() {
    const empId = this.props.match.params.id;
    console.log('ID :::', empId);



    axios
      .get(
        "https://jazzfit-api.herokuapp.com/refreshtoken/" + empId
      )
      .then(response => {
        console.log(response.data.data);
        this.setState({
          jwtToken: response.data.data
        });
        this.getEmpData(empId);
      })
      .catch(error => { });



    // axios.get("http://localhost:5900/emp/" + this.state.empId)
    //   .then(res => {
    //     console.log(res.data.data);
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   })
  }


  getEmpData = async (empId) => {
    const response = await axios.get("https://jazzfit-api.herokuapp.com/emp/" + empId, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.state.jwtToken
      }
    });
    console.log(response.data.data);
    this.setState({
      userServerData: response.data.data,
      Emp_Name: response.data.data[0].empName,
      Emp_ID: response.data.data[0].empId,
      Email: response.data.data[0].email,
      DOB: response.data.data[0].dateOfBirth,
      Department: response.data.data[0].department,
      Gender: response.data.data[0].gender,
      totalAttempt: response.data.data[0].totalAttempt,
      empId: response.data.data[0].empId,
      // value: "",
      // height: "",
      // weight: "",
      // confirmDirty: false,
      // jwtToken: "",
      // testArray: [],
      // iconLoading: false,
      // loading: false,
    })

    this.onButtonclick(response.data.data[0].gender);


    setTimeout(() => {
      console.log(this.state, "THIS IS SERVER DATA ");

    }, 3000);
  }

  // onChange(e) {
  //   const re = /^\d*\.?\d*$/;
  //   if(re.test(e.target.value)) {
  //     // console.log('done...');
  //     this.setState({ [e.target.name]: e.target.value });
  //   } else {
  //     // console.log('lol...');
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
    // console.log(";;;;;;;;;", this.state.userId + "    e cvalue " + e.target.value)
  };
  onheightChange = e => {
    e.preventDefault();
    const re = /^[1-9.]{0,4}$/;
    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onweightChange = e => {
    e.preventDefault();
    const re = /^[0-9]{0,4}$/;
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
    // console.log("YO :::::: ", this.state.Emp_ID);
    localStorage.setItem("empID", this.state.Emp_ID);
    localStorage.setItem("totalAttempt", 0);
    // e.preventDefault();
    // this.componentMount();
    // console.log("token", this.state.jwtToken + "empId " + this.state.userId);


    const myData = {
      height: this.state.height,
      weight: this.state.weight
    };
    // console.log("this is submit calling", myData);
    axios({
      method: "put",
      url: "https://jazzfit-api.herokuapp.com/emp/body/" + this.state.empId,
      data: myData
    })
      .then(response => {
        // console.log(response.data.jwtToken);
        // console.log("response.data.success is: ", response.data.status);

        if (response.data.status) {

          // this.props.myNext1();

          axios
            .get("https://jazzfit-api.herokuapp.com/checkemp/" + this.state.Emp_ID)
            .then(response => {
              if (response.data.status) {
                // console.log('::::::::::::::::::::::::   ', this.state.userId);
                // console.log("totalAttempt", response.data.data[0].totalAttempt);
                if (response.data.data[0].totalAttempt === 0) {
                  localStorage.setItem("empID", this.state.Emp_ID);
                  Swal.fire(
                    "",
                    "Survey is starting!",
                    "info"
                  );
                  this.props.myNext1();
                } else {
                  localStorage.setItem("empID", this.state.Emp_ID);
                  Swal.fire("Good job!", "You have completed the survey !", "info");
                  this.props.myNext1();
                  this.props.myNext1();
                }
              }
            })
            .catch(error => {
              // console.log(error.message);
              Swal.fire("Ooppss!", "Something went wrong try again!", "error");
              this.setState({
                iconLoading: false,
                loading: false
              });
            });

          this.setState({
            iconLoading: false,
            loading: false
          });
        }
      })
      .catch(error => {
        // console.log(error.message);
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

  onButtonclick = (gender) => {
    // e.preventDefault();
    console.log("After click ", gender);

    // console.log("value of button ", e.currentTarget.value);
    this.setState({
      Gender: gender
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
      Emp_Name,
      Emp_ID,
      Department,
      Email,
      DOB,
      height,
      weight,
      Gender
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
              {/* {this.state.name} */}
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

                  <Input
                    type="text"
                    size="large"
                    name="Emp_Name"
                    disabled
                    value={Emp_Name}
                    // {this.state.name}
                    onChange={this.ChangeHandler}
                    ref={this.myVideo}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex-container">
              <div className="flex-item flex2">
                <span className="personal-details-text">Id</span>
              </div>
              <div className="flex-item flex1">
                <Form.Item hasFeedback>

                  <Input
                    type="text"
                    size="large"
                    name="Emp_ID"
                    disabled
                    placeholder="112225"
                    // {this.state.userId}
                    value={Emp_ID}
                    onChange={this.onempIdChange}

                  ></Input>

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
                    name="Department"
                    disabled
                    placeholder="Development"
                    value={Department}
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
                    name="DOB"
                    disabled
                    placeholder="1965-05-15"
                    value={DOB}
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
                    className={(Gender === 'Male') ? "activeGender" : ""}
                    type="dashed"
                    size="large"
                    value="Male"
                    disabled
                    style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    onClick={(e) => this.onButtonclick(e.target.value)}
                  >
                    Male
                  </Button>
                  <Button
                    className={(Gender === 'Female') ? "activeGender" : ""}
                    type="dashed"
                    size="large"
                    value="Female"
                    disabled
                    style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    onClick={(e) => this.onButtonclick(e.target.value)}
                  >
                    Female
                  </Button>
                  <Button
                    className={(Gender === 'Other') ? "activeGender" : ""}
                    type="dashed"
                    size="large"
                    value="Other"
                    disabled
                    style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    onClick={(e) => this.onButtonclick(e.target.value)}
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

                  <Input
                    prefix={<Icon type="mail" style={{ paddingTop: "9px" }} />}

                    placeholder="Enter Email Address"
                    name="Email"
                    size="large"
                    disabled
                    placeholder="dev@hoola.tech"
                    required
                    value={this.state.Email}
                    onChange={this.onEmailChange}
                  ></Input>
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
                      placeholder="6.1 feet.inch"
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
                      placeholder="70 kg"
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
                className="firstScreenButton"
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
