import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import { connect } from "umi";
import UserModal from './components/UserModal';
import './index.less'

const index = ({ users }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [record, setRecord] = useState({name: '123'});

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Create',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: { name: string }) => (
                <span>
                    <a onClick={() => { editHandler(record) }}>Edit</a>&nbsp;&nbsp;
                    <a>Delete</a>
                </span>
            ),
        },
    ];
    const editHandler = (record: { name: string }) => {
        setModalVisible(true)
        setRecord(record)
    }
    const handleCancel = () => {
        setModalVisible(false)
    }
    const onFinish = (res) => {
        console.log(res);
        
    }
    return (
        <div className="users-container">
            <Table columns={columns} dataSource={users.data} rowKey="id" />
            <UserModal visible={modalVisible} handleCancel={handleCancel} onFinish={onFinish} record={record}></UserModal>
        </div>
    );
}

// const mapStateToProps = (state) => {
//     console.log(state);

//     return state

// }

// export default connect((state) => {
//     console.log(state);

//     return state

// })(index);
export default connect(state => state)(index);
