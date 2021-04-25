import React, { useState } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import { connect, Dispatch, Loading, UserState } from "umi";
import UserModal from './components/UserModal';
import './index.less';
import { SingleUserType, FormVavlues } from "./data.d";

interface UserPageProps {
    users: UserState,
    dispatch: Dispatch,
    loading: Loading,
}

const UserListPage: React.FC<UserPageProps> = ({ users, dispatch, loading }) => {
    console.log(loading);
    const usersLoading = loading.models.users
    const [modalVisible, setModalVisible] = useState(false);
    const [record, setRecord] = useState<SingleUserType | undefined>(undefined);

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
            render: (text: string, record: SingleUserType) => (
                <span>
                    <a onClick={() => { editHandler(record) }}>Edit</a>&nbsp;&nbsp;
                    <Popconfirm
                        title="确定删除该项数据吗？"
                        onConfirm={() => { confirmDelete(record.id) }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    const editHandler = (record: SingleUserType) => {
        setModalVisible(true)
        setRecord(record)
    }
    const handleCancel = () => {
        setModalVisible(false)
    }
    const onFinish = (res: FormVavlues) => {
        let id: number | undefined
        id = record ? record.id : undefined
        if (id !== undefined) {
            console.log('edit');
            dispatch({
                // 在同一model内部使用dispatch可以省略命名空间，但是当前页面不是model.ts，所以使用dispatch时，
                // 必须给type加上命名空间users用来指定所用的model
                type: 'users/edit',
                payload: {
                    id,
                    record: res
                }
            })
        } else {
            console.log('add');
            dispatch({
                // 在同一model内部使用dispatch可以省略命名空间，但是当前页面不是model.ts，所以使用dispatch时，
                // 必须给type加上命名空间users用来指定所用的model
                type: 'users/add',
                payload: {
                    record: res
                }
            })
        }

        setModalVisible(false);
    }
    const confirmDelete = (id: number) => {
        dispatch({
            type: 'users/delete',
            payload: {
                id
            }
        })
    }
    const addHandler = () => {
        setRecord(undefined);
        setModalVisible(true);
    }
    return (
        <div className="users-container">
            <Button type="primary" onClick={addHandler}>添加</Button>
            <Table columns={columns} dataSource={users.data} rowKey="id" loading={usersLoading} />
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

// })(UserListPage);
export default connect(state => state)(UserListPage);

