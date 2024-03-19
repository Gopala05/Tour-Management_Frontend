import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAdminToken, setAdminData } from "../../../../store/AdminSlice";

const { Text } = Typography;

const AdminLogin: React.FC = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid");
  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const handleLogin = async (value: { adminname: any; password: any }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin_sign_in`,
        {
          admin_name: `${value.adminname}`,
          password: `${value.password}`,
        }
      );
      if (response.status == 202) {
        dispatch(setAdminData(response.data.admin));
        dispatch(setAdminToken(response.data.token));
        navigate("/admin-home");
      }
    } catch (error: any) {
      setIsInvalid(true);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="admin-login-container" style={{ position: "relative" }}>
      <motion.div
        className="admin-login-form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ color: "white", marginBottom: 24, fontSize: "2.5rem" }}>
          {" "}
          Admin Login{" "}
        </h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={(values) => handleLogin(values)}
        >
          <Form.Item
            name="adminname"
            rules={[
              { required: true, message: "Please input your adminname!" },
            ]}
            validateStatus={isInvalid ? "error" : ""}
          >
            <Input
              className="InputBox"
              placeholder="Adminname"
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

        <Text
          style={{
            textAlign: "right",
            marginTop: 16,
            display: "block",
            color: "white",
          }}
        >
          <a href="/login" style={{ textDecoration: "none", color: "white" }}>
            <u>User Login?</u>
          </a>
        </Text>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
