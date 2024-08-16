import React, { useEffect, useState } from 'react';
import styles from './index.less';
import type { App, GetProps } from 'antd';
import { Form, Input, Button, Spin } from 'antd';
import type { FormProps } from 'antd';
import JSEncrypt from "@/utils/JSEncrypt";
import yayJpg from '../../assets/yay.jpg';
import { getVerifyImg, entryHome } from '@/request/api'
import { connect, history } from 'umi';
import { PropsMenu } from '@/types';

type OTPProps = GetProps<typeof Input.OTP>;

type FieldType = {
  account: string;
  password: string;
  useryzm: string;
};

const encryptStr = (str: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCovZnyX5rcFrshuUonS/ZbZQGTs9MY1fakNnH3wFNFb1mnGClV/14Ecfe7VMKrpIKt+q0khtUsWY513SibGHVfr+v9wPGrJj+pNWoWzVKUPLsTLrh+538BwgtxeOU0kctmsOlZp5fCbJf1tbTVoWPOwwpSs4IbdylIPkVxr1ikAwIDAQAB')
  return encrypt.encrypt(str)
}
const Page = (props) => {

  const [imgBase64, setImgBase64] = useState('')  // 图片的base64
  const [verifyImgLoading, setVerifyImgLoading] = useState(false) // 验证码图片是否加载中
  const [loginBtnLoading, setLoginBtnLoading] = useState(false) // 登录按钮是否加载中
  const [auth, setAuth] = useState('')
  useEffect(() => {
    console.log('useEffect');
    console.log(process.env.BASE_API);
    getVerifyImgFunc()
  }, []);

  const getVerifyImgFunc = () => {
    setVerifyImgLoading(true)
    getVerifyImg().then(res => {
      if (res.data.yzm) {
        setImgBase64('data:image/jpeg;base64,' + res.data.yzm)
      }
      if (res.data.auth) {
        setAuth(res.data.auth)
      }
    }).finally(() => {
      setVerifyImgLoading(false)
    })
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    let password = encryptStr(values.password as string) || ""
    setLoginBtnLoading(true)
    entryHome({ ...values, pwd: password, auth }).then(res => {
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('menuTree', JSON.stringify(res.data.menuTree))
        localStorage.setItem('operateJson', JSON.stringify(res.data.operateJson))
        history.push('/')
        props.dispatch({ type: 'login/setMenu', payload: res.data.menuTree })
        props.dispatch({ type: 'login/setOperateJson', payload: res.data.operateJson })
      }
    }).finally(() => {
      setLoginBtnLoading(false)
    })
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_box}>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.login_box_list}>
            <Form.Item<FieldType>
              label=""
              name="account"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input showCount maxLength={20} placeholder="请输入用户名" />
            </Form.Item>
          </div>
          <div className={styles.login_box_list}>
            <Form.Item<FieldType>
              label=""
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            ><Input.Password maxLength={20} placeholder="请输入密码" />
            </Form.Item>
          </div>
          <div className={styles.login_box_list} style={{ display: 'flex', alignContent: 'center', columnGap: 10 }}>
            <Form.Item<FieldType>
              label=""
              name="useryzm"
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Input.OTP length={4} formatter={(str) => str.toUpperCase()} />
            </Form.Item>
            <Spin spinning={verifyImgLoading}>
              <img className={styles.verifyImg} src={imgBase64} onClick={getVerifyImgFunc} width={130} alt="" />
            </Spin>
          </div>
          <div className={styles.login_box_list}>
            <Button type="primary" htmlType="submit" loading={loginBtnLoading} block>
              登录
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: { login: { menu: PropsMenu[]; }; }) => {
  console.log(state);

  return {
    menu: state.login.menu
  }
}

export default connect(mapStateToProps)(Page);
