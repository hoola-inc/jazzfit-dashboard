import React, { Component } from "react";
import Header from "../common/HeaderLayout";
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
  Typography,
  Avatar,
  Upload
} from "antd";
import axios from "axios";
import Swal from "sweetalert2";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BASEURL: "https://jazzfit-api.herokuapp.com/",
      loading: false,
      previewImage: "",
      imageUrl: "",
      empId: 0,
      jwtToken: "",
      email: "",
      dateOfBirth: "",
      department: "",
      empName: "",
      gender: "",
      height: "",
      weight: "",
      fileList: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const empId = localStorage.getItem("empID");
    this.checkEmp(empId);
  }
  handlePreview = file => {
    this.setState({
      imageUrl: file.thumbUrl,
      previewVisible: true
    });
  };
  onChange(e) {
    const re = /^[0-9]{0,4}$/;
    if (e.target.name === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  checkEmp = async empId => {
    try {
      const response = await axios.get(
        `${this.state.BASEURL}checkemp/${empId}`
      );
      if (response.data.status) {
        // Swal.fire("Good job!", "Ycheck Emp !", "info");
        this.refreshToken(empId);
      } else {
        Swal.fire("Sorry!", "You are not registered yet !", "error");
      }
    } catch (error) {
      Swal.fire("Ooppss!", "Something went wrong try again", "error");
    }
  };

  refreshToken = async empId => {
    try {
      const response = await axios.get(
        `${this.state.BASEURL}refreshtoken/${empId}`
      );
      if (response.data.status) {
        // Swal.fire("Good job!", "rfresh ID", "info");
        const token = response.data.data;
        this.getEmployeebyId(empId, token);
      } else {
        message.error("refresh token");
      }
    } catch (error) {
      message.error("token catch");
    }
  };

  getEmployeebyId = async (empId, token) => {
    try {
      const requestHeader = { "x-access-token": token };
      const response = await axios.get(`${this.state.BASEURL}emp/${empId}`, {
        headers: requestHeader
      });
      if (response.data.status) {
        const dataByid = response.data.data[0];
        this.setState(
          {
            imageUrl: response.data.data[0].empImage,
            empId: response.data.data[0].empId,
            jwtToken: token,
            email: response.data.data[0].email,
            dateOfBirth: response.data.data[0].dateOfBirth,
            department: response.data.data[0].department,
            empName: response.data.data[0].empName,
            gender: response.data.data[0].gender,
            height: response.data.data[0].height,
            weight: response.data.data[0].weight
          },
          () => {
            // this.sendtoServer();
          }
        );
      } else {
        Swal.fire("Sorry!", "You are not registered yet !", "error");
      }
    } catch (error) {
      Swal.fire("Sorry!", "You are not registered yet !", "error");
    }
  };

  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    console.log("fileList", fileList[0].originFileObj.name);

    // you store them in state, so that you can make a http req with them later
    this.setState({ fileList, imageUrl: fileList[0].originFileObj });
    this.handlePreview(fileList[0].originFileObj);
  };
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  updateProfile = async () => {
    const url = `${this.state.BASEURL}emp/weight/${this.state.empId}`;

    var fd = new FormData();

    fd.set("weight", this.state.weight);
    if (this.state.fileList[0] >= 0) {
      fd.append(
        "empImage",
        this.state.fileList[0].originFileObj,
        this.state.fileList[0].originFileObj.name
      );
    }
    console.log("value of fd ", fd + "emp isd " + this.state.empID);

    try {
      const headers = {
        "Content-type": "multipart/form-data",
        "x-access-token": this.state.jwtToken
      };
      const response = await axios({
        method: "patch",
        url: url,
        data: fd,
        headers: headers
      });
      if (response.data.status) {
        message.success("updated");
        console.log("image response", response);
      }
    } catch (error) {
      message.error("bad request");
      console.log("image response error", error);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Button
          type="primary"
          icon="mail"
          size="large"
          style={{
            width: "100%",
            backgroundColor: "#FFDD00",
            marginTop: "45%"
          }}
        >
          Change Image
        </Button>
        {/* <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div> */}
      </div>
    );
    const { previewVisible, previewImage, fileList } = this.state;
    const { imageUrl } = this.state;
    return (
      <Layout>
        <Header />
        <Layout>
          <div className="setting-background">
            <Row>
              <Row>
                <Col span={8} style={{ margin: "5% 15%" }}>
                  <h1 className="settings-heading">Settings</h1>
                  <h3
                    className="personal-details-text"
                    style={{ textAlign: "start" }}
                  >
                    Please enter the required details to complete your profile
                  </h3>
                </Col>
              </Row>
              <Col span={10} style={{ marginLeft: "11%" }}>
                <Form
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 16 }}
                  // onSubmit={this.submitHandler}
                >
                  <div className="flex-container">
                    <div className="flex-item flex2">
                      <span className="personal-details-text">Full Name</span>
                    </div>
                    <div className="flex-item flex1">
                      <Form.Item hasFeedback validateStatus="success">
                        <Input
                          type="text"
                          size="large"
                          // name="name"
                          value={this.state.empName}
                          // onChange={this.ChangeHandler}
                          // ref={this.myVideo}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex-container">
                    <div className="flex-item flex2">
                      <span className="personal-details-text">Id</span>
                    </div>
                    <div className="flex-item flex1">
                      <Form.Item hasFeedback validateStatus="success">
                        <Input
                          type="text"
                          size="large"
                          // name="userId"
                          value={this.state.empId}
                          // onChange={this.ChangeHandler}
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
                          name="department"
                          value={this.state.department}
                          // onChange={this.onChange}
                        ></Input>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex-container">
                    <div className="flex-item flex2">
                      <span className="personal-details-text">Email</span>
                    </div>
                    <div className="flex-item flex1">
                      <Form.Item hasFeedback validateStatus="error">
                        <Input
                          prefix={<Icon type="mail" />}
                          placeholder="Enter Email Address"
                          name="email"
                          size="large"
                          placeholder="me@example.com"
                          required
                          value={this.state.email}
                          onChange={this.onEmailChange}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex-container">
                    <div className="flex-item flex2">
                      <span className="personal-details-text">
                        Date Of Birth
                      </span>
                    </div>
                    <div className="flex-item flex1">
                      <Form.Item>
                        <Input
                          // prefix={<Icon type="mail" />}
                          placeholder="Enter Email Address"
                          name="dateofbirth"
                          size="large"
                          placeholder="me@example.com"
                          required
                          value={this.state.dateOfBirth}
                        />
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
                          type="primary"
                          size="large"
                          style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                        >
                          Male
                        </Button>
                        <Button
                          type="dashed"
                          size="large"
                          style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                        >
                          Female
                        </Button>
                        <Button
                          type="dashed"
                          size="large"
                          style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                        >
                          Other
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </Col>
              <Col span={10}>
                <Form
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 16 }}
                  // onSubmit={this.submitHandler}
                >
                  <div
                    className="flex-container"
                    style={{ marginLeft: "3%", marginBottom: "5%" }}
                  >
                    <Avatar size={150} icon="user" src={this.state.imageUrl} />
                  </div>
                  <Form.Item>
                    <Col span={8} offset={1}>
                      <Upload
                        name="avatar"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        // listType="picture-card"
                        // className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={this.handleUpload}
                      >
                        {imageUrl
                          ? // <img
                            //   src={imageUrl}
                            //   alt="avatar"
                            //   style={{ width: "100%" }}
                            // />
                            uploadButton
                          : uploadButton}
                      </Upload>
                      {/* <Button
                        type="primary"
                        icon="mail"
                        size="large"
                        style={{
                          width: "100%",
                          backgroundColor: "#FFDD00",
                          marginTop: "45%"
                        }}
                      >
                        Change Image
                      </Button> */}
                    </Col>
                  </Form.Item>
                  <div
                    className="flex-container-setting"
                    style={{ marginLeft: "-20%" }}
                  >
                    <div className="flex-item-setting flex2-setting">
                      <span className="personal-details-text">Height</span>
                    </div>
                    <div className="flex-item-setting flex1-setting">
                      <Form.Item>
                        <Col span={8}>
                          <Input
                            type="text"
                            size="large"
                            placeholder="e.g 5'10"
                            name="height"
                            value={this.state.height}
                            // onChange={this.onChange}
                          ></Input>
                        </Col>
                      </Form.Item>
                    </div>
                  </div>

                  <div
                    className="flex-container-setting"
                    style={{ marginLeft: "-20%" }}
                  >
                    <div className="flex-item-setting flex2-setting">
                      <span className="personal-details-text">Weight</span>
                    </div>
                    <div className="flex-item-setting flex1-setting">
                      <Form.Item>
                        <Col span={8}>
                          <Input
                            type="text"
                            size="large"
                            placeholder="e.g 67kg"
                            maxLength="3"
                            name="weight"
                            value={this.state.weight}
                            onChange={this.onChange}
                          ></Input>
                        </Col>
                        {/* TODO change here  */}
                      </Form.Item>
                    </div>
                  </div>
                  <div style={{ marginTop: "10%" }}>
                    <Button
                      type="primary"
                      icon="arrow-right"
                      size="large"
                      style={{ width: "40%" }}
                      onClick={this.updateProfile}
                    >
                      Update Information
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Layout>
      </Layout>
    );
  }
}
