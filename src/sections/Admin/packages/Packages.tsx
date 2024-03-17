import { useEffect, useState } from "react";
import AdminDashboard from "../../../pages/AdminDashboard";
import { Card, Modal, Table } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectAdminToken } from "../../../../store/AdminSlice";

function Packages() {
  const [data, setData] = useState([]);

  const token = useSelector(selectAdminToken);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/adventure-package`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response) => {
        setData(response.data.places);
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
      title: "Locations",
      dataIndex: "locations",
      sorter: (a: any, b: any) => a.locations.localeCompare(b.locations),
    },
    {
      title: "No. Of Places",
      dataIndex: "no_of_places",
      sorter: (a: any, b: any) => a.no_of_places-b.no_of_places,
    },
    {
      title: "No. Of Activities",
      dataIndex: "no_of_activities",
      sorter: (a: any, b: any) => a.no_of_activities-b.no_of_activities,
    },
    {
      title: "Price",
      dataIndex: "cost",
      sorter: (a: any, b: any) => a.cost.localeCompare(b.cost),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      sorter: (a: any, b: any) => a.duration.localeCompare(b.duration),
    },
    {
      title: "Starts On",
      dataIndex: "start_date",
      sorter: (a: any, b: any) => a.start_date.localeCompare(b.start_date),
      render: (text: string) => {
        const [year, month, day] = text.split("-");
        return `${day}-${month}-${year}`;
      },
    },
  ];

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
      </AdminDashboard>
    </>
  );
}

export default Packages;
