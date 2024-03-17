import { FC, ReactNode, useState } from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import AdminHeader from "../sections/Admin/adminDashboard/AdminHeader";
import AdminSidebar from "../sections/Admin/adminDashboard/AdminSidebar";

interface Props {
  children: ReactNode;
}

const AdminDashboard: FC<Props> = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState<boolean>(false);

  const OpenSidebar = (): void => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <AdminHeader OpenSidebar={OpenSidebar} />
        <AdminSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      <Layout className="main-container postlogin-background">
        <Content>
          {children}
        </Content>
      </Layout>

      {/* <Home /> */}
    </div>
  );
};

export default AdminDashboard;
