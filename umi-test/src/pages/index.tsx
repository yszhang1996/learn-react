import { FC } from "react";
import styles from './index.less';

const IndexPage:FC = () => {
  console.log('indexpage');
  
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

export default IndexPage
