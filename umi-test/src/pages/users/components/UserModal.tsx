import { useEffect } from "react";
import { Modal, Form, Input } from 'antd';

const UserModal = (props) => {
    const [form] = Form.useForm()
    const { visible, record, handleCancel, onFinish } = props
    useEffect(() => {
        if (record) {
            form.setFieldsValue(record)
        } else {
            form.resetFields()
        }
    }, [visible]);

    const close = () => {
        handleCancel()
    }

    const onOk = () => {
        // 点击OK按钮后触发表单的提交时间，提交成功走onFinish，提交失败走onFinishFailed
        form.submit()
    }

    const onFinishFailed = (err) => {
        console.log(err);
    }

    return (
        <>
            <Modal title="Basic Modal" visible={visible} onOk={onOk} onCancel={close} forceRender>
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Create Time"
                        name="create_time"
                        rules={[{ required: false, message: 'Please input your create time!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserModal
