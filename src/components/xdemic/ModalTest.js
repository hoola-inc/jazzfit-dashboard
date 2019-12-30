import React, { Component } from "react";
import {
  Upload,
  Button,
  Form,
  Icon,
  Input,
  Modal,
  Row,
  Col,
  DatePicker
} from "antd";
import FormItem from "antd/lib/form/FormItem";

const { Dragger } = Upload;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ModalTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
      uploading: false,
      showmodal: false
    };
  }

  showModal = () => {
    this.setState({ showmodal: true });
  };
  handleCancel = () => {
    this.setState({ showmodal: false });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    // Only show error after a field is touched.
    const coursenameError =
      isFieldTouched("coursename") && getFieldError("coursename");
    const courseCodeError =
      isFieldTouched("coursecode") && getFieldError("coursecode");
    const courseUnityError =
      isFieldTouched("courseunity") && getFieldError("courseunity");
    const courseUnitValuError =
      isFieldTouched("courseunitvalu") && getFieldError("courseunitvalu");
    const prerequisitesError =
      isFieldTouched("prerequisites") && getFieldError("prerequisites");
    const usernameError =
      isFieldTouched("username") && getFieldError("username");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <div>
        <Button onClick={this.showModal}>
          <Icon type="upload" /> Select File
        </Button>

        <Modal
          title="Enter Course Details"
          visible={this.state.showmodal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          // footer={[<Button type="default">Back</Button>,<Button type="primary">Create</Button>]}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item style={{ marginBottom: -1 }}>Course Name</Form.Item>
            <Form.Item
              style={{ marginBottom: -1 }}
              validateStatus={coursenameError ? "error" : ""}
              help={coursenameError || ""}
            >
              {getFieldDecorator("coursename", {
                rules: [
                  { required: true, message: "Please Enter your Course Name!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter Course Name"
                />
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: -1 }}>
              Course Code (Recommended)
            </Form.Item>
            <Form.Item
              style={{ marginBottom: -1 }}
              validateStatus={courseCodeError ? "error" : ""}
              help={courseCodeError || ""}
            >
              {getFieldDecorator("coursecode", {
                rules: [
                  { required: true, message: "Please Enter your Course Code!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter Course Code"
                />
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: -1 }}>
              Course Credit Unity Type
            </Form.Item>
            <Form.Item
              style={{ marginBottom: -1 }}
              validateStatus={courseUnityError ? "error" : ""}
              help={courseUnityError || ""}
            >
              {getFieldDecorator("courseunity", {
                rules: [
                  {
                    required: true,
                    message: "Please Enter Course Credit Unity Types!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Course Credit Unity Types"
                />
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: -1 }}>
              Course Credit Unit Value
            </Form.Item>
            <Form.Item
              style={{ marginBottom: -1 }}
              validateStatus={courseUnitValuError ? "error" : ""}
              help={courseUnitValuError || ""}
            >
              {getFieldDecorator("courseunitvalu", {
                rules: [
                  {
                    required: true,
                    message: "Please Enter Course Credit Unit Value!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Course Credit Unit Value"
                />
              )}
            </Form.Item>

            <FormItem style={{ marginBottom: -1 }}>
              <Row gutter={8}>
                <Col span={12}>Min Result</Col>
                <Col span={12}>Max Result</Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("minresult", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter min result you got!"
                      }
                    ]
                  })(<Input />)}
                </Col>
                <Col span={12}>
                  {getFieldDecorator("maxresult", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter max result you got!"
                      }
                    ]
                  })(<Input />)}
                </Col>
              </Row>
            </FormItem>

            <Form.Item style={{ marginBottom: -1 }}>
              Course Credit Unit Value
            </Form.Item>
            <Form.Item
              style={{ marginBottom: -1 }}
              validateStatus={prerequisitesError ? "error" : ""}
              help={prerequisitesError || ""}
            >
              {getFieldDecorator("prerequisites", {
                rules: [
                  {
                    required: true,
                    message: "Please Enter Prerequisites!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter Prerequisites"
                />
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: -1 }}>Term</Form.Item>
            <Form.Item style={{ marginBottom: -1 }}>
              <DatePicker size="large" style={{ width: "100%" }}></DatePicker>
            </Form.Item>

            <Form.Item style={{ marginTop: "10%" }}>
              <Row>
                <Col span={12} style={{textAlign:'end', paddingRight:"5%"}}>
                  <Button style ={{width:"50%"}} onClick={this.handleCancel}>Back</Button>
                </Col>
                <Col span={12} >
                  <Button style ={{width:"50%"}} type ="primary">Create</Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create({ name: "horizontal_login" })(
  ModalTest
);
export default WrappedHorizontalLoginForm;
