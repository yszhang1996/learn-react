import { useEffect } from "react";
import { Modal, Form, Input } from 'antd';

const UserModal = (props) => {
    const [form] = Form.useForm()
    const { visible, record, handleCancel, onFinish } = props
    useEffect(() => {
        form.setFieldsValue(record)
    }, [visible]);

    const close = () => {
        handleCancel()
    }

    const onOk = () => {
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
                        rules={[{ required: true, message: 'Please input your create time!' }]}
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
