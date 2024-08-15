import React, { useEffect, useMemo, useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { connect, history } from 'umi';
import { PropsMenu } from '@/types';

const App = (props: { menu: PropsMenu[] }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(() => {
    const path = history.location.pathname;
    return [path];
  });

  useEffect(() => {
    // 如果Props中的menu不存在，跳转到登录页面
    if (!props.menu || props.menu.length === 0) {
      history.push('/login')
    }
  }, [])

  const menuListMemo = useMemo(() => {
    return props.menu.map(item => {
      return {
        key: "/"+item.pageUrl,
        icon: <PieChartOutlined />,
        label: item.powerName,
        children: item.children ? item.children.map(item2 => {
          return {
            key: "/"+item2.pageUrl,
            label: item2.powerName,
          }
        }) : null
      }
    })
  }, [props.menu])
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const goto = (item: { key: string }) => {
    history.push(item.key)
  };

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        onClick={goto}
        inlineCollapsed={collapsed}
        items={menuListMemo}
      />
    </div>
  );
};

const mapStateToProps = (state: { login: { menu: PropsMenu[]; }; }) => {
  console.log(state);

  return {
    menu: state.login.menu
  }
}


export default connect(mapStateToProps)(App);