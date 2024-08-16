import { Link, Outlet } from 'umi';
import styles from './index.less';
import Menu from '@/components/Menu';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
export default function Layout() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.layout}>
        <Menu />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
}
