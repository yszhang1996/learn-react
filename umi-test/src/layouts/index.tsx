import React, { useState, FC } from 'react';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import { history, Location } from 'umi';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';

const Layout: FC<{ location: Location }> = (props) => {
    const path = props.location.pathname

    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
    const [pathname, setPathname] = useState(path);
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                {...defaultProps}
                location={{
                    pathname,
                }}
                waterMarkProps={{
                    content: 'Pro Layout',
                }}
                onPageChange={(Location: any) => {
                    console.log(Location);
                    history.push(Location);
                }}
                menuFooterRender={(props) => {
                    return (
                        <a
                            style={{
                                lineHeight: '48rpx',
                                display: 'flex',
                                height: 48,
                                color: 'rgba(255, 255, 255, 0.65)',
                                alignItems: 'center',
                            }}
                            href="https://preview.pro.ant.design/dashboard/analysis"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                alt="pro-logo"
                                src="https://procomponents.ant.design/favicon.ico"
                                style={{
                                    width: 16,
                                    height: 16,
                                    margin: '0 16px',
                                    marginRight: 10,
                                }}
                            />
                            {!props?.collapsed && 'Preview Pro'}
                        </a>
                    );
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            setPathname(item.path || '/');
                        }}
                    >
                        {dom}
                    </a>
                )}
                rightContentRender={() => (
                    <div>
                        <Avatar shape="square" size="small" icon={<UserOutlined />} />
                    </div>
                )}
                {...settings}
            >
                <div>
                    {props.children}
                </div>
            </ProLayout>
            {/* <SettingDrawer
                pathname={pathname}
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => setSetting(changeSetting)}
                disableUrlParams
            /> */}
        </div>
    );
};

export default Layout