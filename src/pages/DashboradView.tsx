import { FC, ReactNode, useState } from "react";
import Header from "../sections/dashboard/Header";
import Sidebar from "../sections/dashboard/Sidebar";
// import Home from "../sections/dashboard/Home";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

interface Props {
  children: ReactNode;
}

const App: FC<Props> = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState<boolean>(false);

  const OpenSidebar = (): void => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      <Layout className="dashboard-home">
        <Content >
          {children}
        </Content>
      </Layout>

      {/* <Home /> */}
    </div>
  );
};

export default App;
