// import {
//   BsFillArchiveFill,
//   BsFillGrid3X3GapFill,
//   BsPeopleFill,
//   BsFillBellFill,
// } from "react-icons/bs";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
import Boy from "../../assets/Icons/Boy_Avatar.png";
import Girl from "../../assets/Icons/Girl_Avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  // selectToken,
  selectUserData,
  setBookings,
} from "../../../store/UserSlice";
import DashboardLayout from "../../pages/DashboradView";
import { Avatar, Card, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectToken } from "../../../store/UserSlice";

import { format } from "date-fns";

function Home() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const token = useSelector(selectToken);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/booking-details `, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response) => {
        const data = response.data.details.filter(
          (item: any) => item.user_id == user.user_id
        );
        const year_filter = data.filter((item: any) => {
          const bookedYear = new Date(item.booking_date).getFullYear(); // Extract year from Booked_on date
          return bookedYear === parseInt(year);
        });
        const final_data = year ? year_filter : data;
        setData(final_data);
        dispatch(setBookings(data));
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
  }, [year]);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "booking_id",
      //   render: (record: any) => {
      //     const fullName = `${record.first_name} ${record.last_name}`;
      //     return fullName;
      //   },
      sorter: (a: any, b: any) => a.booking_id - b.booking_id,
    },
    {
      title: "Locations",
      dataIndex: "package_name",
      //   render: (record: any) => {
      //     const fullName = `${record.first_name} ${record.last_name}`;
      //     return fullName;
      //   },
      sorter: (a: any, b: any) => a.package_name.localeCompare(b.package_name),
    },
    {
      title: "Booked On",
      dataIndex: "booking_date",
      align: "center" as const,
      render: (date: string) => (
        <span style={{ textAlign: "center" }}>
          {format(new Date(date), "dd-MM-yyyy ")}
        </span>
      ),
      sorter: (a: any, b: any) =>
        new Date(a.date_time).getTime() - new Date(b.date_time).getTime(),
    },
    {
      title: "Passengers Count",
      dataIndex: "no_of_passengers",
      sorter: (a: any, b: any) => a.no_of_passengers - b.no_of_passengers,
    },
    {
      title: "Total Price",
      dataIndex: "total_cost",
      sorter: (a: any, b: any) => a.total_cost.localeCompare(b.total_cost),
    },
  ];
  // const token = useSelector(selectToken);

  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  return (
    <>
      <DashboardLayout>
        <main className="main-container">
          <Card style={{ background: "transparent", border: "none" }}>
            <div className="profile-info card">
              <Avatar
                size={80}
                src={
                  user.gender.toString().toLowerCase() == "male" ? Boy : Girl
                }
              />
              <span className="dark-label">
                Welcome!{" "}
                <span style={{ color: "#FF6347" }}>
                  {user.first_name} {user.last_name}
                  {/* <Badge
                  count={"Member"}
                  style={{ backgroundColor: "#38A6E7" }}
                /> */}
                </span>
              </span>
            </div>
          </Card>
          <div className="main-title sign-up-item">
            <h2>
              TRAVEL <span style={{ marginLeft: "1vw" }}></span>HISTORY
            </h2>
          </div>
          <div>
            <label className="sign-up-item">
              {" "}
              Select the Year Data you please to see
            </label>
            <br></br>
            <Select
              onChange={(value) => setYear(value)}
              placeholder="Select the Year"
              style={{ width: "20vw", marginBottom: "3vh", marginTop: "2vh" }}
              allowClear
            >
              <Select.Option value="2000"> 2000 </Select.Option>
              <Select.Option value="2021"> 2021 </Select.Option>
              <Select.Option value="2022"> 2022 </Select.Option>
              <Select.Option value="2023"> 2023 </Select.Option>
              <Select.Option value="2024"> 2024 </Select.Option>
              <Select.Option value="2025"> 2025 </Select.Option>
              <Select.Option value="2026"> 2026 </Select.Option>
              <Select.Option value="2027"> 2027 </Select.Option>
              <Select.Option value="2028"> 2028 </Select.Option>
              <Select.Option value="2029"> 2029 </Select.Option>
              <Select.Option value="2030"> 2030 </Select.Option>
            </Select>
          </div>

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

          {/* <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>PRODUCTS</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>300</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>CATEGORIES</h3>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h1>12</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>CUSTOMERS</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>33</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>ALERTS</h3>
              <BsFillBellFill className="card_icon" />
            </div>
            <h1>42</h1>
          </div>
        </div> */}

          {/* <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
        </main>
      </DashboardLayout>
    </>
  );
}

export default Home;
