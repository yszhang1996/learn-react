// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/张康辉/Documents/learn-react/umi-test/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.tsx').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('@/pages/404.tsx').default,
        "breadcrumbName": "404"
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.tsx').default,
        "breadcrumbName": "首页"
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login/index.tsx').default,
        "breadcrumbName": "登录"
      },
      {
        "path": "/manage",
        "exact": true,
        "component": require('@/pages/manage/index.tsx').default
      },
      {
        "path": "/users",
        "routes": [
          {
            "path": "/users",
            "exact": true,
            "component": require('@/pages/users/index.tsx').default
          },
          {
            "path": "/users/name",
            "exact": true,
            "component": require('@/pages/users/name/index.tsx').default
          }
        ],
        "component": require('@/pages/users/_layout.tsx').default
      },
      {
        "component": require('@/pages/404.tsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}