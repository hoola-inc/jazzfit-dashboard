import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Input, Form, DatePicker } from 'antd';

class AddNewStudentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            iconLoading: false,
            email: '',
        };

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    enterLoading = () => {
        this.setState({ loading: true });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        this.enterLoading();
        // this.handleSubmit()
        this.sendCourse();
    }

    sendCourse = () => {
        axios.post('https://xdemic-api.herokuapp.com/email', this.state)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false });
                    Swal.fire('Success', 'Email Sent', 'success');
                    this.handleCancel();
                }
                else {
                    Swal.fire('Oho...', 'Something went wrong!', 'error');
                    this.handleCancel();
                    this.setState({ loading: false })
                }
            })
            .catch(err => {
                console.log('An Error occured while sending Email ::: ', err.message);
                Swal.fire('Error', err.message, 'error');
                this.setState({ loading: false });
                this.handle.onCancel();
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { email } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button block type="default" onClick={this.showModal}>
                    Create
                </Button>
                <Modal
                    title="Enter Course Detail"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.submitHandler}>
                        <Form.Item label="Student Email">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input student email!' }],
                            })(
                                <Input
                                    placeholder="enter student email"
                                    allowClear
                                    name="email"
                                    value={email}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>


                        <Button type="primary" loading={this.state.loading} onClick={this.submitHandler} ghost >
                            Submit
                    </Button>

                    </Form>
                </Modal>
            </div>

        );
    }
}



const AddNewStudent = Form.create()(AddNewStudentModal);

export default AddNewStudent; 