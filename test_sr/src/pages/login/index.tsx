import React, { useEffect } from 'react';
import styles from './index.less';
import type { GetProps } from 'antd';
import { Input } from 'antd';
import yayJpg from '../../assets/yay.jpg';
import { getVerifyImg } from '@/request/api'

type OTPProps = GetProps<typeof Input.OTP>;
export default function Page() {

  useEffect(() => {
    console.log('useEffect');
    console.log(process.env.BASE_API);
    getVerifyImg().then(res => {
      console.log(res);
    })
  }, []);
  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_box}>
        <div className={styles.login_box_list}><Input placeholder="请输入用户名" /></div>
        <div className={styles.login_box_list}><Input showCount maxLength={20} placeholder="请输入密码" /></div>
        <div className={styles.login_box_list}>
          <Input.OTP length={4} formatter={(str) => str.toUpperCase()} {...sharedProps} />
          <img src={yayJpg} width={130} alt="" />
        </div>
      </div>
    </div>
  );
}
