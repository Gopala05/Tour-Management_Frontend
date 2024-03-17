import { useEffect, useState } from "react";
import AdminDashboard from "../../../pages/AdminDashboard";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectAdminData,
  selectAdminToken,
  setAdminToken,
} from "../../../../store/AdminSlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function ManageDestinations() {
  const [data, setData] = useState([]);
  const [Editable, setEditable] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid");
  const [selected, setSelected] = useState<any>({
    destination_id: "",
    place: "",
    price: "$0",
    no_of_places: 0,
    no_of_activities: 0,
  });
  const [update, setUpdated] = useState(true);

  const dispatch = useDispatch();
  const admin = useSelector(selectAdminData);
  const token = useSelector(selectAdminToken);

  const [formValues, setFormValues] = useState({
    place_names: "",
    activities: "",
    places: "",
    price: "",
  });

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setIsInvalid(false);
    setErrorMessage("");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/top-destination`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response) => {
        setData(response.data.details);
        setUpdated(false);
      })
      .catch((error) => {
        Modal.error({
          title: "Error",
          content: (
            <Card style={{ fontSize: "20px" }} bordered>
              <b>
                {error.message == "Request failed with status code 500"
                  ? "Internal Server Error"
                  : error.response.data.message === "Invalid token"
                  ? "Session Logged Out \n Please Login Again"
                  : error.response.data.message}
              </b>
            </Card>
          ),
          style: {
            top: "10%",
            left: "100px",
          },
        });
      });
  }, [update]);

  const handleTokenRefresh = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/token-refresh`, {
        refresh_token: token.refresh_token,
      })
      .then((response) => {
        dispatch(setAdminToken(response.data));
      })
      .catch((error) => {
        Modal.error({
          title: "Error",
          content: (
            <Card style={{ fontSize: "20px" }} bordered>
              <b>
                {error.message == "Request failed with status code 500"
                  ? "Internal Server Error"
                  : error.response.data.message === "Invalid token"
                  ? "Session Logged Out \n Please Login Again"
                  : error.response.data.message}
              </b>
            </Card>
          ),
          style: {
            top: "10%",
            left: "100px",
          },
        });
      });
  };

  const handleDelete = async (record: any) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/delete-top-destination?destination_id=${record.destination_id}`,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      if (response.status == 204) {
        const newData = data.filter(
          (item: any) => item.destination_id != record.destination_id
        );
        setData(newData);
        notification.open({
          message: "Successful",
          description: <b>Top Destination removed Successfully !</b>,
          placement: "topLeft",
          style: {
            backgroundColor: "white",
            border: "2px solid #38A6E7",
            borderRadius: "5px",
          },
        });
      }
      handleTokenRefresh();
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content: (
          <Card style={{ fontSize: "20px" }} bordered>
            <b>
              {error.message == "Request failed with status code 500"
                ? "Internal Server Error"
                : error.response.data.message === "Invalid token"
                ? "Session Logged Out \n Please Login Again"
                : error.response.data.message}
            </b>
          </Card>
        ),
        style: {
          top: "10%",
          maxWidth: "90%",
          margin: "0 auto",
        },
        bodyStyle: {
          padding: "20px",
        },
      });
    }
  };

  const payload = new FormData();

  payload.append("destination_id", selected.destination_id);
  formValues.place_names == ""
    ? null
    : payload.append("place_names", formValues.place_names);
  formValues.places == ""
    ? null
    : payload.append("no_of_places", formValues.places);
  formValues.activities == ""
    ? null
    : payload.append("no_of_activities", formValues.activities);
  formValues.price == "" ? null : payload.append("price", formValues.price);
  payload.append("created_by", admin.admin_id);

  const resetForm = () => {
    setFormValues({
      place_names: "",
      activities: "",
      places: "",
      price: "",
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/update-top-destination`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      if (response.status == 200) {
        notification.open({
          message: "Successful",
          description: <b>Top Destination Updated Successfully !</b>,
          placement: "topLeft",
          style: {
            backgroundColor: "white",
            border: "2px solid #38A6E7",
            borderRadius: "5px",
          },
        });
        resetForm();
        setEditable(false);
        setUpdated(true);
      }
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content: (
          <Card style={{ fontSize: "20px" }} bordered>
            <b>{error.response.data.message!}</b>
          </Card>
        ),
        style: {
          top: "10%",
          left: "100px",
        },
      });
    }
  };

  const columns = [
    {
      title: "Place Name",
      dataIndex: "place_names",
      sorter: (a: any, b: any) => a.place_names.localeCompare(b.place_names),
    },
    {
      title: "No. Of Places",
      dataIndex: "no_of_places",
      sorter: (a: any, b: any) => a.no_of_places - b.no_of_places,
    },
    {
      title: "No. Of Activities",
      dataIndex: "no_of_activities",
      sorter: (a: any, b: any) => a.no_of_activities - b.no_of_activities,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: any, b: any) => a.price.localeCompare(b.price),
    },
    {
      title: "Actions",
      dataIndex: "member_id",
      width: '8%',
      render: (_: any, record: any) => {
        return (
          <span>
            {
              <Flex gap={5}>
                <span
                  onClick={() => {
                    setEditable(true), setSelected(record);
                  }}
                  className="hover-button"
                  style={{ width: "50%" }}
                >
                  <EditOutlined />
                </span>
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record)}
                >
                  {
                    <DeleteOutlined
                      className="hover-button"
                      style={{ width: "50%" }}
                    />
                  }
                </Popconfirm>
              </Flex>
            }
          </span>
        );
      },
    },
  ];

  const handleClose = () => {
    setEditable(false);
    resetForm();
  };

  return (
    <>
      <AdminDashboard>
        <Table
          style={{ textAlign: "center" }}
          bordered
          dataSource={data}
          columns={columns}
          pagination={{
            pageSizeOptions: [5, 10, 20, 50, 100],
            showPrevNextJumpers: true,
            showSizeChanger: true,
          }}
        />
        <Modal
          title={
            <p
              style={{
                textAlign: "left",
                fontSize: "1.5rem",
                marginBottom: "4%",
                marginTop: "1%",
              }}
            >
              Update Form
            </p>
          }
          open={Editable}
          style={{ width: "150%", top: "5vh" }}
          maskStyle={{ backdropFilter: "blur(10px)" }}
          onOk={handleClose}
          onCancel={handleClose}
          footer={[
            <>
              <p
                style={{
                  color: "red",
                  textAlign: "start",
                  marginBottom: "5vh",
                }}
              >
                {isInvalid ? errorMessage : ""}
              </p>
              <Button
                key="submit"
                type="primary"
                className="login-button"
                onClick={() => handleSave()}
              >
                Update
              </Button>
            </>,
          ]}
        >
          <Form>
            <Row style={{ gap: 30, marginTop: "3vh" }}>
              <Col lg={11}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the Place Name !",
                    },
                  ]}
                  validateStatus={
                    isInvalid ? (formValues.place_names ? "" : "error") : ""
                  }
                  help={
                    isInvalid
                      ? formValues.place_names
                        ? null
                        : "Please Enter the Place Name !"
                      : null
                  }
                  style={{ textAlign: "start" }}
                >
                  <label style={{ color: "black", fontSize: "0.9rem" }}>
                    Place Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    value={
                      formValues.place_names == "" ? "" : formValues.place_names
                    }
                    name="place_names"
                    className="InputBox"
                    type="text"
                    placeholder={selected.place_names}
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
                    isInvalid ? (formValues.price ? "" : "error") : ""
                  }
                  help={
                    isInvalid
                      ? formValues.price
                        ? null
                        : "Please Enter the Cost !"
                      : null
                  }
                  style={{ textAlign: "start" }}
                >
                  <label style={{ color: "black", fontSize: "0.9rem" }}>
                    Cost (in Dollars) <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    value={formValues.price == "" ? "" : formValues.price}
                    name="price"
                    type="number"
                    className="InputBox"
                    placeholder={selected.price}
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
                  <label style={{ color: "black", fontSize: "0.9rem" }}>
                    No. Of Activities <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    value={
                      formValues.activities == "" ? "" : formValues.activities
                    }
                    name="activities"
                    type="number"
                    className="InputBox"
                    placeholder={selected.no_of_activities || 0}
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
                  <label style={{ color: "black", fontSize: "0.9rem" }}>
                    No. Of Places <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    value={formValues.places == "" ? "" : formValues.places}
                    name="places"
                    type="number"
                    className="InputBox"
                    placeholder={selected.no_of_places || 0}
                    onChange={handleInput}
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </AdminDashboard>
    </>
  );
}

export default ManageDestinations;
