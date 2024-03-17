import { Avatar, Badge, Card, Col, Modal, Row, Table } from "antd";
import Boy from "../../../assets/Icons/Admin.png";
// import { useSelector } from "react-redux";
import AdminDashboard from "../../../pages/AdminDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAdminToken } from "../../../../store/AdminSlice";
// import { selectAdminData } from "../../../../store/AdminSlice";

function AdminHome() {
  // const admin = useSelector(selectAdminData);

  const [data, setData] = useState([]);

  const token = useSelector(selectAdminToken);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/travels`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response) => {
        setData(response.data.details);
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

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "booking_id",
      sorter: (a: any, b: any) => a.booking_id-b.booking_id,
    },
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
      title: "Booked On", 
      dataIndex: "booked_on",
      align: 'center' as const,
      render: (text: string) => {
        const [year, month, day] = text.split("-");
        return `${day}-${month}-${year}`;
      },
      sorter: (a: any, b: any) => a.booked_on.localeCompare(b.booked_on),
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
      title: "Passengers Count",
      dataIndex: "no_of_passengers",
      sorter: (a: any, b: any) => a.no_of_passengers-b.no_of_passengers,
    },
    {
      title: "Total Price",
      dataIndex: "total_cost",
      sorter: (a: any, b: any) => a.total_cost.localeCompare(b.total_cost),
    },
  ];

  return (
    <>
    <AdminDashboard>
      <main className="main-container">
        <Card className="card-pro" style={{ background: 'transparent', border: 'none' }}>
          <Row className="profile-info card" style={{ display: 'flex' }}>
            <Col lg={200}>
              <Avatar size={80} src={Boy} />
            </Col>
            <Col lg={10}>
            <span className="dark-label">
              Welcome!{" "}
              <span style={{ color: "#FF6347" }}>
                Admin
                <Badge
                  count={"Admin"}
                  style={{ backgroundColor: "#38A6E7" }}
                />
              </span>
            </span>
            </Col>
          </Row>
        </Card>
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
        
      </main>
      </AdminDashboard>
    </>
  );
}

export default AdminHome;
