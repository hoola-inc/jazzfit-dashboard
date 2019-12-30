import React, { Component } from "react";
import { Button, Input, Form } from "antd";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      productDetail: "",
      productImage: ""
    }
  }

  ChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    
  };

  render() {
    const { productName, productDetail, productImage } = this.state;
    return (
      <div>
        <Form layout="vertical" onSubmit={this.submitHandler}>
          <div>
            <Input
              placeholder="Product Name :"
              type="text"
              name="productName"
              value={productName}
              onChange={this.ChangeHandler}
            />
          </div>
          <div>
            <Input
              placeholder="Product Detail:"
              type="text"
              name="productDetail"
              value={productDetail}
              onChange={this.ChangeHandler}
            />
          </div>
          <div>
            <Input
              placeholder="Product Image:"
              type="text"
              name="productImage"
              value={productImage}
              onChange={this.ChangeHandler}
            />
          </div>

          <div>
            <Button type="primary" onClick={this.submitHandler}>Submit</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default PostForm;
