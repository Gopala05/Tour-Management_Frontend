import { useState } from "react";
import AdminDashboard from "../../../pages/AdminDashboard";
import { Button, Col, Form, Input, Row, notification } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectAdminData, selectAdminToken } from "../../../../store/AdminSlice";

function CreateTopDestinations() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid");

  const admin = useSelector(selectAdminData);
  const token = useSelector(selectAdminToken);

  const [formValues, setFormValues] = useState({
    place_name: "",
    activities: "",
    places: "",
    cost: "",
  });

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setIsInvalid(false);
    setErrorMessage("");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmission = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-top-destination`,
        {
          place_names: formValues.place_name,
          no_of_activities: parseInt(formValues.activities),
          no_of_places: parseInt(formValues.places),
          price: "$ "+formValues.cost,
          created_by: admin.admin_id
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
          place_name: "",
          activities: "",
          places: "",
          cost: "",
        });
        notification.open({
          message: (
            <p style={{ fontSize: "1.5rem", color: "#00a3d5" }}>Successful</p>
          ),
          description: (
            <p style={{ fontSize: "1rem" }}>
              <b>{response.data.message}</b>
              <br></br>Top Destination Added Successfully!
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
      setErrorMessage(error.response.data.message || "Error While Registering");
    }
  };

  return (
    <>
      <AdminDashboard>
        <label style={{ fontSize: "2rem" }}> Top Destinations Creation Form</label>
        <Form>
          <Row style={{ gap: 50, marginTop: '3vh' }}>
            <Col lg={11}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Place Name !",
                  },
                ]}
                validateStatus={
                  isInvalid ? (formValues.place_name ? "" : "error") : ""
                }
                help={
                  isInvalid
                    ? formValues.place_name
                      ? null
                      : "Please Enter the Place Name !"
                    : null
                }
                style={{ textAlign: "start" }}
              >
                <label style={{ color: "white", fontSize: "1rem" }}>
                Place Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  value={formValues.place_name=="" ? "" : formValues.place_name}
                  name="place_name"
                  type="text"
                  placeholder="Place Name"
                  onChange={handleInput}
                ></Input>
              </Form.Item>

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
                  value={formValues.cost=="" ? "" : formValues.cost}
                  name="cost"
                  type="number"
                  placeholder="Cost"
                  onChange={handleInput}
                ></Input>
              </Form.Item>
              
            </Col>
            <Col lg={11}>
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
                  value={formValues.activities=="" ? "" : formValues.activities}
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
                  value={formValues.places=="" ? "" : formValues.places}
                  name="places"
                  type="number"
                  placeholder="Number Of Places"
                  onChange={handleInput}
                ></Input>
              </Form.Item>

            </Col>
          </Row>
        </Form>
        <p style={{ color: "red", textAlign: "start", marginBottom: '5vh' }}>
            {isInvalid ? errorMessage : ""}
          </p>
        <Button className="login-button" onClick={() => handleSubmission()}>
          Add Package
        </Button>
      </AdminDashboard>
    </>
  );
}

export default CreateTopDestinations;
