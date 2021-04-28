import React, { useState, useRef, FC } from 'react';
import { Button, } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { connect, Dispatch, UserState, history } from 'umi';
import UserModal from './components/UserModal';
import { SingleUserType, FormVavlues } from './data';
import './index.less'
import { getRemoteList } from './service'

interface UserPageProps {
    users: UserState,
    dispatch: Dispatch,
    breadcrumbName: string,
}

const UserListPage: FC<UserPageProps> = ({ users, dispatch, children }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [record, setRecord] = useState<SingleUserType | undefined>(undefined);

    const columns: ProColumns<SingleUserType>[] = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            search: false,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Create',
            dataIndex: 'create_time',
            key: 'create_time',
            valueType: 'dateTime',
            search: false,
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            search: false,
        },
        {
            title: '操作',
            key: 'option',
            width: 120,
            valueType: 'option',
            render: (_, row, index, action) => [
                <a key="editable"
                    onClick={() => {
                        action?.startEditable(row.id);
                    }}>
                    编辑
                </a>,
                <a key="delete"
                    onClick={() => {
                        confirmDelete(row.id);
                    }}>
                    删除
                </a>,
            ],
        },
    ];

    const ref = useRef<ActionType>();

    const editHandler = (record: SingleUserType) => {
        setModalVisible(true)
        setRecord(record)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    const onFinish = (res: FormVavlues) => {
        console.log('add');
        dispatch({
            // 在同一model内部使用dispatch可以省略命名空间，但是当前页面不是model.ts，所以使用dispatch时，
            // 必须给type加上命名空间users用来指定所用的model
            type: 'users/add',
            payload: {
                record: res,
                ref
            }
        })
        setModalVisible(false);
    }

    const confirmDelete = (id: number) => {
        dispatch({
            type: 'users/delete',
            payload: {
                id,
                ref
            }
        })
    }

    const addHandler = () => {
        setRecord(undefined);
        setModalVisible(true);
    }

    const requestHandler = async (params: {
        pageSize: number;
        current: number;
    }) => {
        console.log('触发requestHandler');
        console.log(params)
        const users = await getRemoteList({ page: params.current, per_page: params.pageSize, });
        console.log(users);
        return {
            data: users.data,
            success: true,
            total: users.meta.total
        }
    }

    const onSave = async (Key: any, row: SingleUserType) => {
        console.log(Key, row);
        return new Promise<void>((resolve, reject) => {
            dispatch({
                // 在同一model内部使用dispatch可以省略命名空间，但是当前页面不是model.ts，所以使用dispatch时，
                // 必须给type加上命名空间users用来指定所用的model
                type: 'users/edit',
                payload: {
                    id: Key,
                    record: row,
                    ref
                },
                callback: (res) => {
                    console.log(res);                    
                    if (res) {
                        resolve()
                    } else {
                        reject()
                    }
                }
            })
        })
    }
    return (
        <div className="users-container">
            <ProTable
                columns={columns}
                rowKey="id"
                actionRef={ref}
                editable={{
                    type: 'single',
                    onSave: onSave,
                }}
                pagination={{
                    pageSizeOptions: ['5', '10', '20'],
                    pageSize: 5,
                }}
                toolBarRender={() => [
                    <Button key="button" type="primary" onClick={addHandler}>
                        新建
                    </Button>,
                    <Button key="button" type="primary" onClick={() => {
                        history.push('/users/name')
                    }}>
                        跳转
                    </Button>
                ]}
                options={{
                    density: true,
                    fullScreen: true,
                    setting: true,
                }}
                request={requestHandler}
            />
            <UserModal visible={modalVisible} handleCancel={handleCancel} onFinish={onFinish} record={record}></UserModal>
            <div>{children}</div>
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

