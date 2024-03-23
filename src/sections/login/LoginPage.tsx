import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../../assets/Animation_Files/Login_back.json";
import animationData1 from "../../assets/Animation_Files/Login_Ani.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "../../../store/UserSlice";

const { Text } = Typography;

const LoginPage: React.FC = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleEnterKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleLogin;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  const handleLogin = async (value: { username: any; password: any }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sign_in`,
        {
          username: `${value.username}`,
          password: `${value.password}`,
        }
      );
      if (response.status == 202) {
        dispatch(setUserData(response.data.user));
        dispatch(setToken(response.data.token));
        navigate("/home");
      }
    } catch (error: any) {
      setIsInvalid(true);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="login-container" style={{ position: "relative" }}>
      <Lottie
        options={defaultOptions}
        height={"100vh"}
        width={"100vw"}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      />
      <Lottie
        options={defaultOptions1}
        height={"70vh"}
        width={"50vw"}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-100%, -50%)",
          zIndex: 2,
        }}
      />

      <motion.div
        className="login-form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ color: "#FF6347", marginBottom: 24 }}> Login </h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={(values) => handleLogin(values)}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            validateStatus={isInvalid ? "error" : ""}
          >
            <Input
              className="InputBox"
              placeholder="Username"
              onChange={() => setIsInvalid(false)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateStatus={isInvalid ? "error" : ""}
          >
            <Input.Password
              className="InputBox"
              placeholder="Password"
              onChange={() => setIsInvalid(false)}
            />
          </Form.Item>

          <p style={{ color: "red", textAlign: "start" }}>
            {isInvalid ? errorMessage : ""}
          </p>

          <Form.Item>
            <Button type="primary" className="login-button" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: "right", marginTop: 16, display: "block" }}>
          <p style={{ textAlign: "center", margin: 0 }}>
            Don't have an account? <a href="/sign-up">Sign up</a>{" "}
          </p>
          <br />
          <a href="/admin-login">
            <u>Admin Login?</u>
          </a>
        </Text>
      </motion.div>
    </div>
  );
};

export default LoginPage;
