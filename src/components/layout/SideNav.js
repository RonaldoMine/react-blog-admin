import {Menu} from "antd";
import {NavLink, useLocation} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {DashboardOutlined, SolutionOutlined} from "@ant-design/icons";

function SideNav() {
    const {pathname} = useLocation();
    const page = pathname.replace("/", "");
    const color = "#1890ff";
    const menus = ([{
        label: (<NavLink to="/dashboard">
                <span
                    className="icon"
                    style={{
                        background: page === "dashboard" ? color : "",
                    }}
                >
                  {<DashboardOutlined/>}
                </span>
            <span className="label">Dashboard</span>
        </NavLink>), key: 0
    }, {
        label: (<NavLink to="/posts">
                <span
                    className="icon">
                  {<SolutionOutlined/>}
                </span>
            <span className="label">Posts</span>
        </NavLink>), key: 1
    },]);

    return (<>
        <div className="brand">
            <img src={logo} alt=""/>
            <span>Example Dashboard</span>
        </div>
        <hr/>
        <Menu theme="light" mode="inline" items={menus}/>
    </>);
}

export default SideNav;
