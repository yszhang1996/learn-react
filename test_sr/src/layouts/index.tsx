import { Link, Outlet } from 'umi';
import styles from './index.less';
import Menu from '@/components/Menu';
export default function Layout() {
  return (
    <div className={styles.layout}>
      <Menu />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
