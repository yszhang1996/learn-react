import styles from './index.less';

const IndexPage = () => {
  console.log('indexpage');
  
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

IndexPage.breadcrumbName = "首页"
export default IndexPage
