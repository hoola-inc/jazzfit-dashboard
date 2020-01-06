import React from "react";
import { Modal, Button, Input, Form } from "antd";
import Swal from "sweetalert2";
import axios from "axios";

class UserModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      productDetail: "",
      productImage: ""
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    });
  }

  componentWillUnmount() {}

  state = { visible: false, loading: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  //   handleOk = e => {
  //     // console.log(e);
  //     this.setState({
  //       visible: false
  //     });
  //   };

  //   handleCancel = e => {
  //     // console.log(e);
  //     this.setState({
  //       visible: false
  //     });
  //   };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    // console.log(this.state);
    axios
      .post("http://localhost:9000/product", this.state)
      .then(response => {
        // console.log(response);
        if (response) {
          // message.info("Data Submitted Successfully");
          Swal.fire('Sucess', 'Data submitted successfully', 'success');
          this.props.history.push("/home");
        }
      })
      .catch(error => {
        // console.log(error);
      });
    // if(true) {
    //   message.success('Data Submited successfully');
    //   // Swal.fire('Sucess', 'Data submitted successfully', 'success');
    // }
  };

  render() {
    const { productName, productDetail, productImage } = this.state;
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
        <Modal
          title="Enter User Details"
          footer={null}
          closeIcon={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical" onSubmit={this.submitHandler}>
            <Form.Item>
              <Input
                placeholder="Product Name :"
                type="input"
                name="productName"
                value={productName}
                onChange={this.changeHandler}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Product Detail:"
                type="input"
                name="productDetail"
                value={productDetail}
                onChange={this.changeHandler}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Product Image:"
                type="input"
                name="productImage"
                value={productImage}
                onChange={this.changeHandler}
              />
            </Form.Item>
            {/* <Form.Item>
              <Input placeholder="Enter Department:" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Enter Gender:" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Enter Age:" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Enter Height:" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Enter Weight:" />
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
                onClick={this.submitHandler}
              >
                Enter
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default UserModal;
