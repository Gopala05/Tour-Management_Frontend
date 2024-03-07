import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import Nav from "../home/nav";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../assets/SignnUp.jpg";

function SignUp() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];
  const [mobileInvalid, setMobileInvalid] = useState(false);
  const [mobileError, setErrorMessageMobile] = useState("");

  const [formValues, setFormValues] = useState({
    user_name: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    aadhar: "",
    DOB: "",
    address: "",
  });

  const [formDropDownValues, setFormDropDownValues] = useState({
    Gender: "",
  });

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setIsInvalid(false);
    setMobileInvalid(false);
    if (e.target.name == "mobile_number"){
      if(e.target.value.toString().length > 10) {
        setMobileInvalid(true)
        setErrorMessageMobile("Mobile number Should be 10 digits only")
      }
    }
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDropDown = (fieldName: any, value: any) => {
    setFormDropDownValues({
      ...formDropDownValues,
      [fieldName]: value,
    });
  };

  const handleCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleEnterKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
        if(isCheckboxChecked)
        {
            handleSignUp();
        }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create_user`,
        {
          username: formValues.user_name,
          password: formValues.password,
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          email: formValues.email,
          mobile_number: formValues.mobile_number,
          gender: formDropDownValues.Gender,
          aadhar_number: formValues.aadhar,
          date_of_birth: formValues.DOB,
          address: formValues.address
        }
      );
      if (response.status == 201) {
        notification.open({
          message: (
            <p style={{ fontSize: "1.5rem", color: "#00a3d5" }}>Successful</p>
          ),
          description: (
            <p style={{ fontSize: "1rem" }}>
              <b>{response.data.message}</b>
              <br></br>Please note your
              <b>USER NAME: </b>
              <b style={{ fontSize: "1.3rem", color: "#07273a" }}>
                {" " + response.data.user.username}
              </b>
              <br></br>
              <b>Passowrd: </b>
              <b style={{ fontSize: "1.3rem", color: "#07273a" }}>
                {" " + response.data.user.password}
              </b>
            </p>
          ),
          placement: "topLeft",
          style: {
            backgroundColor: "white",
            border: "2px solid #38A6E7",
            borderRadius: "5px",
          },
        });
        navigate("/login");
      }
    } catch (error: any) {
      setIsInvalid(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container" style={{ position: "relative", overflowY: "hidden", backgroundImage: `url(${back})`, backgroundSize: 'cover' }} >
      <Nav hide={true} />
      <div className="sign-up">
        <h1 style={{ color: "#bd88c2" }}> Sign Up </h1>

        <motion.div className="sign-up-card" style={{ top: '47vh', }}>
          <p
            style={{
              color: "white",
              textAlign: "start",
              marginBottom: "1vh",
              // marginLeft: "30px",
              // marginTop: "15px",
              fontSize: "1.8rem",
            }}
          >
            Be a part of the Travel Family
          </p>
          <Form style={{ height: '70vh', top: 0}}>
            <Flex gap={20} vertical>
              <Row gutter={100}>
                <Col md={8} lg={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please Enter your Username!",
                      },
                    ]}
                    validateStatus={
                      isInvalid ? (formValues.user_name ? "" : "error") : ""
                    }
                    style={{ textAlign: "start" }}
                  >
                    <label className="sign-up-item">
                      Username <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      name="user_name"
                      className="InputBox"
                      placeholder="Username"
                      onChange={handleInput}
                    ></Input>
                  </Form.Item>

                  <Form.Item
                    rules={[
                      { required: true, message: "Please Enter Passowrd!" },
                    ]}
                    validateStatus={
                      isInvalid ? (formValues.password ? "" : "error") : ""
                    }
                    style={{ textAlign: "start" }}
                  >
                    <label className="sign-up-item">
                      Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input.Password
                      name="password"
                      className="InputBox"
                      placeholder="Password"
                      onChange={handleInput}
                    ></Input.Password>
                  </Form.Item>

                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please Enter AAdhar Number!",
                      },
                    ]}
                    validateStatus={
                      isInvalid ? (formValues.aadhar ? "" : "error") : ""
                    }
                    style={{ textAlign: "start" }}
                  >
                    <label className="sign-up-item">
                      Aadhar Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input.Password
                      name="aadhar"
                      className="InputBox"
                      placeholder="Aadhar Number"
                      onChange={handleInput}
                    ></Input.Password>
                  </Form.Item>

                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please Enter your First Name!",
                      },
                    ]}
                    validateStatus={
                      isInvalid ? (formValues.email ? "" : "error") : ""
                    }
                    style={{ textAlign: "start" }}
                  >
                    <label className="sign-up-item">
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      name="email"
                      className="InputBox"
                      placeholder="email"
                      onChange={handleInput}
                    ></Input>
                  </Form.Item>

                  <Form.Item style={{ textAlign: "start" }}
                      rules={[
                      {
                        required: true,
                        message: "Please Enter your mobile Number!",
                      },
                    ]}

                    validateStatus={
                      mobileInvalid ? "error" : ""
                    }
                    help={
                      mobileInvalid
                        ? mobileError
                        : null
                    }
                    >

                    <label className="sign-up-item"> Mobile Number </label>
                    <Input
                      type="number"
                      name="mobile_number"
                      className="InputBox"
                      placeholder="Mobile Number"
                      onChange={handleInput}
                    ></Input>
                  </Form.Item>

                </Col>
                <Col md={8} lg={12}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please Enter your First Name!",
                      },
                    ]}
                    validateStatus={
                      isInvalid ? (formValues.first_name ? "" : "error") : ""
                    }
                    style={{ textAlign: "start" }}
                  >
                    <label className="sign-up-item">
                      First Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      name="first_name"
                      className="InputBox"
                      placeholder="First Name"
                      onChange={handleInput}
                    ></Input>
                  </Form.Item>

                  <Form.Item style={{ textAlign: "start" }}>
                    <label className="sign-up-item"> Last Name </label>
                    <Input
                      name="last_name"
                      className="InputBox"
                      placeholder="Last Name"
                      onChange={handleInput}
                    ></Input>
                  </Form.Item>

                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please Select Gender!",
                      },
                    ]}
                    validateStatus={
                      isInvalid
                        ? formDropDownValues.Gender
                          ? ""
                          : "error"
                        : ""
                    }
                    style={{ textAlign: "start" }}
                  >
                    <div className="sign-up-item">
                      Gender <span style={{ color: "red" }}>*</span>
                    </div>
                    <Select
                      placeholder="Gender"
                      onChange={(value) => handleDropDown("Gender", value)}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input: any, option: any) =>
                        option && option.children
                          ? (option.children as unknown as string)
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          : false
                      }
                    >
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                      <Select.Option value="Others">Others</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                        validateStatus={
                          isInvalid ? (formValues.DOB ? "" : "error") : ""
                        }
                        help={
                          isInvalid
                            ? formValues.DOB
                              ? null
                              : "Please Enter or Choose Date of Birth !"
                            : null
                        }
                        style={{ textAlign: "start" }}
                      >
                        <label className="sign-up-item">
                          Date Of Birth <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          type="date"
                          name="DOB"
                          className="InputBox"
                          onChange={handleInput}
                          max={currentDate}
                          value={formValues.DOB}
                        />
                      </Form.Item>

                  <Form.Item style={{ textAlign: "start" }}>
                    <label className="sign-up-item"> Address </label>
                    <Input
                      name="address"
                      className="InputBox"
                      placeholder="Address"
                      onChange={handleInput}
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
              <p style={{ color: "red", textAlign: "start" }}>
                {isInvalid ? errorMessage : ""}
              </p>
              <Card
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                  padding: 0,
                }}
              >
                <Form.Item style={{ margin: 0, textAlign: "justify" }}>
                  <Checkbox onChange={handleCheckboxChange} >
                    <p style={{ fontFamily: '-moz-initial', fontWeight: 900}}>I herby declare that details provided true and correct to
                    the best of my knowledge.
                    <br />I understand and agree that this data collected shall
                    be stored and used by the Provider as per the prevalent data
                    protection laws/rules/regulations/guidelines.
                    </p>
                  </Checkbox>
                </Form.Item>
              </Card>
              <div>
                <Button
                  type="primary"
                  className="login-button"
                  style={{
                    textAlign: "end",
                    justifyContent: "flex-end",
                  }}
                  onClick={() => handleSignUp()}
                  disabled={!isCheckboxChecked}
                >
                  Submit
                </Button>
              </div>
            </Flex>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;
