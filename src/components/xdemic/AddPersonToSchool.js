import React, { Component } from "react";
import {
  Row,
  Button,
  Col,
  Modal,
  Form,
  Input,
  DatePicker,
  Table,
  Tag,
  Avatar,
  Upload,
  Icon,
  message,
  Menu
} from "antd";
import Swal from "sweetalert2";
import FormItem from "antd/lib/form/FormItem";
import axios from "axios";

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
const { SubMenu } = Menu;

//Upload props end here
function onChange(date, dateString) {
  // console.log(date, dateString);
}


// rowSelection Table start
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    //  console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   "selectedRows: ",
    //   selectedRows
    // );
  },
  getCheckboxProps: record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};

// tabel data array ends
class AddPersonToSchool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csvmodal: false,
      csvdragger: false,
      csvdragresult: false,
      showmodal: false,
      collapsed: false,

      fileList: [],
      uploading: false,
      tableData: []
    };
  }

  componentDidMount() {
    axios
      .get("https://xdemic-api.herokuapp.com/persons")
      .then(res => {
        // console.log(res);
        if (res.data.status) {
          this.setState({ loading: false });
          this.setState({
            uploading: false,
            tableData: res.data.data
          });
        } else {
          Swal.fire("Oho...", "Something went wrong!", "error");
          this.handleCancel();
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        // console.log("An Error occured while sending Email ::: ", err.message);
        Swal.fire("Error", err.message, "error");
        // this.setState({ loading: false });
        // this.handle.onCancel();
      });
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.set("csv", fileList[0]);

    this.setState({
      uploading: true
    });

    axios({
      method: "post",
      url: "https://xdemic-api.herokuapp.com/person/csv",
      data: formData
    })
      .then(response => {
        // Table Columns ENd data array start
        const data = [];
        // const tags = response.data.data[0].tags
        //handle success
        // console.log(response);
        data.push(response.data.data);
        // console.log("UPDATED RECORD::", data);
        this.setState({
          uploading: false,
          showmodal:false,
          tableData: data
        });
      })
      .catch(response => {
        //handle error
        // console.log(response);
        message.error("shit fuck");
        this.setState({
          uploading: false
        });
      });
  };

  /// Tabel COlumns start
  columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: () => (
        <span>
          <Avatar />
        </span>
      )
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "DID",
      dataIndex: "did",
      key: "did"
    },
    {
      title: "DOB",
      dataIndex: "birthDate",
      key: "dob"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: "Phone",
      dataIndex: "mobile",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    // {
    // title: "Date",
    // dataIndex: "createdAt",
    // key: "createdAt"
    // },

    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: () => (
        <span>
          <Button type="primary" ghost onClick={this.sendInvite}>
            Send
          </Button>
        </span>
      )
    },
    {
      title: "CrateTime",
      dataIndex: `createdAt`,
      key: "createdAt"
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, record) => (
        <span>
          <Icon type="upload" />
        </span>
      )
    }
  ];

  sendInvite = () => {
    const hide = message
      .loading("Action in progress..", 2, onclose)
      .then(afterClose => {
        message.success("invite sent!");
      });
  };

  // CSV Modal functions end here
  csvShowImage = () => {
    // console.log("this is working");
    this.setState({
      csvdragger: false,
      csvdragresult: true
    });
  };
  // Create Button Modal

  createModal = () => {
    this.setState({ showmodal: true });
  };
  handleCancel = () => {
    this.setState({ showmodal: false });
  };

  render() {
    const { uploading, fileList } = this.state;

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div>
        {/* <Row gutter={24}>
                <Col span={8}>
                <div>
                <Upload {...props}>
                <Button>
                <Icon type="upload" /> Select File
                </Button>
                </Upload>
                <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
                >
                {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
                </div>
                </Col>
                </Row> */}
        <Row gutter={24} style={{ marginTop: 25 }}>
          <Col span={22}>
            <Form layout="inline">
              <Form.Item>
                <Button onClick={this.createModal}>
                  <Icon type="upload" /> Select File
                </Button>
                {/* <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Select File
                  </Button>
                </Upload> */}
              </Form.Item>
              <Form.Item>
                {/* <Button
                  type="primary"
                  onClick={this.handleUpload}
                  disabled={fileList.length === 0}
                  loading={uploading}
                >
                  {uploading ? "Uploading" : "Start Upload"}
                </Button> */}
              </Form.Item>
              <FormItem>
                <Search placeholder="Search Name" size="small" />
              </FormItem>
              <FormItem>
                <Search placeholder="Search Name" />
              </FormItem>
              <FormItem>
                <RangePicker onChange={onChange} />
              </FormItem>
              <FormItem>
                <Button type="primary">Search</Button>
              </FormItem>
              {/* <FormItem>
                            <Button type="default">Reset</Button>
                            </FormItem> */}
            </Form>
          </Col>
          <Col span={2}>
            {/* to do add ad stuent modal here*/}

            {/* <AddNewPerson /> */}
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 25 }}>
          <Table
            bordered
            align="center"
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.state.tableData}
          />
        </Row>
        <Modal
          title="Basic Modal"
          visible={this.state.showmodal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>,
          ]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </Modal>
      </div>
    );
  }
}
export default AddPersonToSchool;
