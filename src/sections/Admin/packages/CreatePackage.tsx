import { useState } from "react";
import AdminDashboard from "../../../pages/AdminDashboard";
import { Button, Col, Form, Input, Row, notification } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  selectAdminData,
  selectAdminToken,
} from "../../../../store/AdminSlice";

function CreatePackage() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid");
  const currentDate = new Date().toISOString().split("T")[0];

  const admin = useSelector(selectAdminData);
  const token = useSelector(selectAdminToken);

  const [formValues, setFormValues] = useState({
    locations: "",
    activities: "",
    places: "",
    cost: "",
    duration: "",
    start_date: "",
  });

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setIsInvalid(false);
    setErrorMessage("");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmission = async () => {
    if (formValues.start_date < currentDate) {
      notification.error({
        message: (
          <p style={{ fontSize: "1.5rem", color: "#00a3d5" }}>Invalid</p>
        ),
        description: (
          <p style={{ fontSize: "1rem" }}>
            <b>Date Can not be Lesser than Todays Date</b>
          </p>
        ),
        placement: "topLeft",
        style: {
          backgroundColor: "white",
          border: "2px solid #38A6E7",
          borderRadius: "5px",
        },
      });
      setFormValues({ ...formValues, start_date: "" });
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/create-adventure-package`,
          {
            locations: formValues.locations,
            no_of_activities: parseInt(formValues.activities),
            no_of_places: parseInt(formValues.places),
            cost: "$ " + formValues.cost,
            duration: formValues.duration + " Weeks",
            start_date: formValues.start_date,
            created_by: admin.admin_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        if (response.status == 201) {
          setIsInvalid(false);
          setErrorMessage("");
          setFormValues({
            locations: "",
            activities: "",
            places: "",
            cost: "",
            duration: "",
            start_date: "",
          });
          notification.open({
            message: (
              <p style={{ fontSize: "1.5rem", color: "#00a3d5" }}>Successful</p>
            ),
            description: (
              <p style={{ fontSize: "1rem" }}>
                <b>{response.data.message}</b>
              </p>
            ),
            placement: "topLeft",
            style: {
              backgroundColor: "white",
              border: "2px solid #38A6E7",
              borderRadius: "5px",
            },
          });
        }
      } catch (error: any) {
        setIsInvalid(true);
        setErrorMessage(
          error.response.data.message || "Error While Registering"
        );
      }
    }
  };

  return (
    <>
      <AdminDashboard>
        <label style={{ fontSize: "2rem" }}> Package Creation Form</label>
        <Form>
          <Row style={{ gap: 50, marginTop: "3vh" }}>
            <Col lg={11}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Locations !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.locations ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.locations
                      ? null
                      : "Please Enter the Locations !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label style={{ color: "white", fontSize: "1rem" }}>
                  Locations <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  value={formValues.locations == "" ? "" : formValues.locations}
                  name="locations"
                  type="text"
                  placeholder="Locations"
                  onChange={handleInput}
                ></Input>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Activities !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.activities ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.activities
                      ? null
                      : "Please Enter the Activities !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label style={{ color: "white", fontSize: "1rem" }}>
                  No. Of Activities <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  value={
                    formValues.activities == "" ? "" : formValues.activities
                  }
                  name="activities"
                  type="number"
                  placeholder="Number Of Activities"
                  onChange={handleInput}
                ></Input>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Places !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.places ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.places
                      ? null
                      : "Please Enter the Places !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label style={{ color: "white", fontSize: "1rem" }}>
                  No. Of Places <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  value={formValues.places == "" ? "" : formValues.places}
                  name="places"
                  type="number"
                  placeholder="Number Of Places"
                  onChange={handleInput}
                ></Input>
              </Form.Item>
            </Col>
            <Col lg={11}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Cost !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.cost ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.cost
                      ? null
                      : "Please Enter the Cost !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label style={{ color: "white", fontSize: "1rem" }}>
                  Cost (in Dollars) <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  value={formValues.cost == "" ? "" : formValues.cost}
                  name="cost"
                  type="number"
                  placeholder="Cost"
                  onChange={handleInput}
                ></Input>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Duration !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.duration ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.duration
                      ? null
                      : "Please Enter the Duration !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label style={{ color: "white", fontSize: "1rem" }}>
                  Duration (in Weeks) <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  value={formValues.duration == "" ? "" : formValues.duration}
                  name="duration"
                  type="number"
                  placeholder="Duration"
                  onChange={handleInput}
                ></Input>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Start Date !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.start_date ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.start_date
                      ? null
                      : "Please Enter the Start Date !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label style={{ color: "white", fontSize: "1rem" }}>
                  Start Date <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  value={
                    formValues.start_date == "" ? "" : formValues.start_date
                  }
                  name="start_date"
                  type="date"
                  placeholder="Start Date"
                  min={currentDate}
                  onChange={handleInput}
                ></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <p style={{ color: "red", textAlign: "start", marginBottom: "5vh" }}>
          {isInvalid ? errorMessage : ""}
        </p>
        <Button className="login-button" onClick={() => handleSubmission()}>
          Add Package
        </Button>
      </AdminDashboard>
    </>
  );
}

export default CreatePackage;
