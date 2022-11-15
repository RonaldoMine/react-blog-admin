import {useEffect} from "react";
import {Breadcrumb, Button, Col, Dropdown, Row,} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const menu = (signout) =>  [{
    label: <Link to={"#"}>My Profile</Link>, key: 0
}, {
    label: <Link to={"#"} onClick={(e) => {
        e.preventDefault();
        signout();
    }}>Logout</Link>, key: 1
}];

const toggler = [<svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
>
    <path
        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
</svg>,];

function Header({name, onPress}) {
    const {user: auth, signout} = useAuth();
    useEffect(() => window.scrollTo(0, 0));

    return (<>
        <Row gutter={[24, 0]}>
            <Col span={24} md={6}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to="/">Pages</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{textTransform: "capitalize"}}>
                        {name.replace("/", "")}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="ant-page-header-heading">
            <span className="ant-page-header-heading-title">
              {'Hello, ' + auth.last_name +  ' ' + auth.first_name}
            </span>
                </div>
            </Col>
            <Col span={24} md={18} className="header-control">
                <Button
                    type="link"
                    className="sidebar-toggler"
                    onClick={() => onPress()}
                >
                    {toggler}
                </Button>
                <Dropdown menu={{items: menu(signout)}} trigger={["click"]} className="header-notifications-dropdown">
                    <Link to="/sign-in" className="ant-dropdown-link">
                        <UserOutlined/>
                    </Link>
                </Dropdown>
            </Col>
        </Row>
    </>);
}

export default Header;
