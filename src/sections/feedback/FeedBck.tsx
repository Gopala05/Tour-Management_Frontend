import { useEffect, useState } from "react";
import DashboardLayout from "../../pages/DashboradView";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken, selectUserData } from "../../../store/UserSlice";

function FeedBck() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid");

  const user = useSelector(selectUserData);
  const token = useSelector(selectToken);

  const [formValues, setFormValues] = useState({
    Description: "",
  });

  const [formDropDownValues, setFormDropDownValues] = useState({
    Rating: "",
  });

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setIsInvalid(false);
    setErrorMessage("");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDropDown = (fieldName: any, value: any) => {
    setErrorMessage("");
    setFormDropDownValues({
      ...formDropDownValues,
      [fieldName]: value,
    });
  };

  const handleEnterKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleFeedBack();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  const handleFeedBack = async () => {
    try {
      if (formDropDownValues.Rating && formValues.Description) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/user-feedback`,
          {
            feedback_text: formValues.Description,
            user_id: user.user_id,
            user_name: user.first_name + " " + user.last_name || "",
            rating: parseInt(formDropDownValues.Rating),
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
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
                <br></br>Thank you for your valueable Feedback!
              </p>
            ),
            placement: "topLeft",
            style: {
              backgroundColor: "white",
              border: "2px solid #38A6E7",
              borderRadius: "5px",
            },
          });
          setFormDropDownValues({
            ...formDropDownValues,
            Rating: "",
          });
          setFormValues({ ...formValues, Description: "" });
        }
      } else {
        setIsInvalid(true);
      }
    } catch (error: any) {
      setIsInvalid(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <DashboardLayout>
      <Form style={{ height: "70vh", top: 0 }}>
        <Flex gap={20} vertical>
          <Row gutter={10}>
            <Col lg={10}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Select Rating!",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formDropDownValues.Rating ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formDropDownValues.Rating
                      ? null
                      : "Please Select Rating !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <div className="sign-up-item">
                  Rating <span style={{ color: "red" }}>*</span>
                </div>
                <Select
                  value={
                    formDropDownValues.Rating === ""
                      ? "Rating"
                      : formDropDownValues.Rating
                  }
                  placeholder="Rating"
                  onChange={(value) => handleDropDown("Rating", value)}
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
                  <Select.Option value="1">Poor</Select.Option>
                  <Select.Option value="2">Below Average</Select.Option>
                  <Select.Option value="3">Average</Select.Option>
                  <Select.Option value="4">Good</Select.Option>
                  <Select.Option value="5">Excellent</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col md={8} lg={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Provide the Remarks !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.Description ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.Description
                      ? null
                      : "Please Provide the Remarks !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label className="sign-up-item">
                  Remarks <span style={{ color: "red" }}>*</span>
                </label>
                <Input.TextArea
                  value={
                    formValues.Description === "" ? "" : formValues.Description
                  }
                  name="Description"
                  className="InputBox"
                  placeholder="Description"
                  onChange={handleInput}
                />
              </Form.Item>
            </Col>
          </Row>
          <p style={{ color: "red", textAlign: "start" }}>
            {isInvalid ? errorMessage : ""}
          </p>

          <div>
            <Button
              type="primary"
              className="login-button"
              style={{
                textAlign: "end",
                justifyContent: "flex-end",
              }}
              onClick={() => handleFeedBack()}
            >
              Submit
            </Button>
          </div>
        </Flex>
      </Form>
    </DashboardLayout>
  );
}

export default FeedBck;
