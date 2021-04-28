import { SmileOutlined, UserOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: '首页',
        icon: <SmileOutlined />,
        component: '@/pages/index.tsx',
      },
      {
        path: '/',
        name: '用户',
        icon: <UserOutlined />,
        access: 'canAdmin',
        component: '@/pages/users/index.tsx',
        routes: [
          {
            path: '/users',
            name: '用户',
            component: '@/pages/users/index.tsx',
            routes: [
              {
                path: '/users/name',
                name: '名字',
                component: '@/pages/users/name/index.tsx',
                hideInMenu: true,
              },
            ]
          },
          {
            path: '/manage',
            name: '管理',
            component: '@/pages/manage',
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
};