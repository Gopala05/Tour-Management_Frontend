import { Avatar, Button, Dropdown } from "antd";
import { BsSearch, BsJustify } from "react-icons/bs";
import Boy from "../../../assets/Icons/Admin.png";
import type { MenuProps } from "antd";
import {
  CaretDownOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  OpenSidebar: () => void;
}

function AdminHeader({ OpenSidebar }: HeaderProps) {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Avatar style={{ width: "8vw", height: "8vw" }} src={Boy} />,
    },
    {
      key: "3",
      label: (
        <Button
          type="text"
          style={{
            marginBottom: "16px",
            marginTop: "16px",
            textAlign: "left",
            width: "100%",
          }}
          onClick={() => navigate("/")}
        >
          <PoweroffOutlined /> Sign Out
        </Button>
      ),
    },
  ];

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          verticalAlign: "middle",
          margin: 0,
        }}
      >
        <Avatar size={40} src={Boy} style={{ marginRight: "10px" }} />
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <p
            className="dark-label"
            style={{
              fontSize: "20px",
              color: "whitesmoke",
            }}
          >
            Admin
            <CaretDownOutlined />
          </p>
        </Dropdown>
      </div>
    </header>
  );
}

export default AdminHeader;
