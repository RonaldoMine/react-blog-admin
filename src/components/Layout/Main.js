import {useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Drawer, Layout} from "antd";
import SideNav from "./SideNav";
import Header from "./Header";

const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
  const [visible, setVisible] = useState(false);
  const openDrawer = () => setVisible(!visible);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } `}
    >
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key="left"
        width={250}
        className={`drawer-sidebar`}
      >
        <Layout
          className={`layout-dashboard`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary `}
          >
            <SideNav />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary `}
      >
        <SideNav />
      </Sider>
      <Layout>
          <AntHeader>
            <Header
              onPress={openDrawer}
              name={pathname}
            />
          </AntHeader>
        <Content className="content-ant"><Outlet/></Content>
      </Layout>
    </Layout>
  );
}

export default Main;
