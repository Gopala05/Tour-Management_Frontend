import { Button, Card, Input, Modal, Table } from "antd";
import DashboardLayout from "../../pages/DashboradView";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookings,
  selectToken,
  selectUserData,
  setToken,
} from "../../../store/UserSlice";

function Booking() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const token = useSelector(selectToken);
  const bookings = useSelector(selectBookings);

  const [record_data, setRecord] = useState([]);
  const [cost, setCost] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const handleTokenRefresh = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/token-refresh`, {
        refresh_token: token.refresh_token,
      })
      .then((response) => {
        dispatch(setToken(response.data));
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/adventure-package`)
      .then((response) => {
        const filteredData = response.data.places.filter((place: any) => {
          const hasBooking = bookings.some(
            (booking: any) => booking.package_id === place.adventure_id
          );
          return !hasBooking;
        });

        setData(filteredData);
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
  }, []);

  const handleOk = () => {
    setModalVisible(false);
    setNumberOfPassengers(0);
    setTotalCost(0);
    setCost(0);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setNumberOfPassengers(0);
    setTotalCost(0);
    setCost(0);
  };

  const handleSelect = (record: any) => {
    setCost(parseFloat(record.cost.replace(/\$/g, "")));
    setRecord(record);
    setModalVisible(true);
  };

  useEffect(() => {
    setTotalCost(Math.round(cost * numberOfPassengers));
  }, [numberOfPassengers]);

  const handleBooking = async (record: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/booking-details`,
        {
          user_id: user.user_id,
          adventure_id: record.adventure_id,
          total_cost: "$" + totalCost,
          no_of_passengers: numberOfPassengers,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      if (response.status === 201) {
        handleCancel();
        const updateData = data.filter((item: any) => item.adventure_id != record.adventure_id)
        setData(updateData);
        Modal.info({
          title: "Successfull",
          content: (
            <Card style={{ fontSize: "20px" }} bordered>
              <b>{response.data.message}</b>
            </Card>
          ),
          // style: {
          //   top: "70%",
          //   left: "100px",
          // },
        });
        //   handleTokenRefresh();
        //   navigate("/op-add-member", { state: { aadhar_number, otp } });
      } else {
        handleCancel();
        Modal.error({
          title: "Error",
          content: (
            <Card style={{ fontSize: "20px" }} bordered>
              <b>
                {response.data.message === "Invalid token"
                  ? "Session Logged Out \n Please Login Again"
                  : response.data.message}
              </b>
            </Card>
          ),
          // style: {
          //   top: "70%",
          //   left: "100px",
          // },
        });
      }
    } catch (error: any) {
      handleCancel();
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
        //   style: {
        //     top: "70%",
        //     left: "100px",
        //   },
      });
    }
  };

  const columns = [
    {
      title: "Locations",
      dataIndex: "locations",
      //   render: (record: any) => {
      //     const fullName = `${record.first_name} ${record.last_name}`;
      //     return fullName;
      //   },
      sorter: (a: { locations: string }, b: { locations: string }) =>
        a.locations.localeCompare(b.locations),
    },
    {
      title: "Activities",
      dataIndex: "no_of_activities",
      sorter: (a: any, b: any) => a.no_of_activities - b.no_of_activities,
    },
    {
      title: "No of Places",
      dataIndex: "no_of_places",
      sorter: (a: any, b: any) => a.no_of_places - b.no_of_places,
    },
    {
      title: "Starts On",
      dataIndex: "start_date",
      align: 'center' as const,
      sorter: (a: any, b: any) => a.start_date.localeCompare(b.start_date),
      render: (text: string) => {
        const [year, month, day] = text.split("-");
        return `${day}-${month}-${year}`;
      },
    },
    {
      title: "Travel Duration",
      dataIndex: "duration",
      sorter: (a: any, b: any) => a.duration.localeCompare(b.duration),
    },
    {
      title: "Price",
      dataIndex: "cost",
      sorter: (a: any, b: any) => a.cost.localeCompare(b.cost),
    },
    {
      title: "Booking",
      dataIndex: "",
      align: "center" as const,
      render: (record: any) => {
        return (
          <Button
            className="login-button"
            onClick={() => {
              handleTokenRefresh();
              handleSelect(record);
              // handleBooking(record);
            }}
          >
            Book Now
          </Button>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
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
        className="simple"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        style={{ position: "absolute", display: "inside" }}
      >
        <label style={{ fontSize: "1.3rem" }}> No of Passengers: </label>
        <Input
          type="number"
          onChange={(value) =>
            setNumberOfPassengers(parseInt(value.target.value))
          }
          value={numberOfPassengers == 0 ? "" : numberOfPassengers}
          placeholder="Provide the Number of Passengers Boarding"
          style={{ marginBottom: "2vh" }}
        ></Input>
        {numberOfPassengers > 0 ? (
          <>
            <span style={{ fontSize: "1rem" }}>
              {" "}
              Number of Passengers Selected:{" "}
              <span style={{ fontSize: "1.5rem", color: "blue" }}>
                {numberOfPassengers}
              </span>{" "}
            </span>
            <br></br>
            <span style={{ fontSize: "1rem" }}>
              {" "}
              Total Cost:{" "}
              <span style={{ fontSize: "1.5rem", color: "blue" }}>
                ${totalCost}
              </span>{" "}
            </span>
          </>
        ) : null}
        <br></br>
        <Button
          className="login-button"
          style={{ marginTop: "3vh" }}
          disabled={numberOfPassengers > 0 ? false : true}
          onClick={() => handleBooking(record_data)}
        >
          Proceed
        </Button>
      </Modal>
    </DashboardLayout>
  );
}

export default Booking;
