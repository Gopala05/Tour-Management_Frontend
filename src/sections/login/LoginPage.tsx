import React, { useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation_Files/Login_back.json';
import animationData1 from '../../assets/Animation_Files/Login_Ani.json';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {

  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleLogin = (value: any) => {
    const username = value.username;
    const password = value.password;
    navigate('/dashboard');
  }

  return (
    <div className="login-container" style={{ position: 'relative' }}>
      <Lottie options={defaultOptions} height={'100vh'} width={'100vw'} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      <Lottie options={defaultOptions1} height={'70vh'} width={'50vw'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-100%, -50%)', zIndex: 2 }} />

      <motion.div
        className="login-form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* <Title level={1} style={{ textAlign: 'center', marginBottom: 24 }}> */}
         <h1 style={{color: '#FF6347', marginBottom: 24}}> Login </h1>
        {/* </Title> */}
        <Form name="login" initialValues={{ remember: true }} onFinish={(values) => handleLogin(values)}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input className="InputBox" placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password className="InputBox" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="login-button" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: 'center', marginTop: 16, display: 'block' }}>
          Don't have an account? <a href="#signup">Sign up</a>
        </Text>
      </motion.div>
    </div>
  );
};

export default LoginPage;
