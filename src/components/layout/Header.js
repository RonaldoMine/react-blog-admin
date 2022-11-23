import {useEffect, useState} from "react";
import {Breadcrumb, Button, Col, Drawer, Dropdown, Row,} from "antd";
import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import Title from "antd/lib/typography/Title";
import {profile_svg, setting_svg, toggler_svg} from "../../icons/svg";

const menu = (signOut) => [{
    label: <Link to={"#"}>My Profile</Link>, key: 0
}, {
    label: <a href="/" onClick={(e) => {
        e.preventDefault();
        signOut();
    }}>Logout</a>, key: 1
}];

function Header({name, onPress}) {
    const {user: auth, signOut} = useAuth();
    useEffect(() => window.scrollTo(0, 0));
    const [visible, setVisible] = useState(false);
    const showDrawer = () => setVisible(true);
    const hideDrawer = () => setVisible(false);

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
              {'Hello, ' + auth.last_name + ' ' + auth.first_name}
            </span>
                </div>
            </Col>
            <Col span={24} md={18} className="header-control">
                <Button
                    type="link"
                    className="sidebar-toggler"
                    onClick={() => onPress()}
                >
                    {toggler_svg}
                </Button>
                <Button type="link" onClick={showDrawer}>
                    {setting_svg}
                </Button>
                <Drawer
                    className="settings-drawer"
                    mask={true}
                    width={360}
                    onClose={hideDrawer}
                    placement={"right"}
                    open={visible}
                >
                    <div layout="vertical">
                        <div className="header-top">
                            <Title level={4}>
                                Configurator
                            </Title>
                        </div>
                        <div className="sidebar-color">
                            <Title level={5}>Sidebar Color</Title>

                        </div>
                    </div>
                </Drawer>
                <Dropdown menu={{items: menu(signOut)}} trigger={["click"]} className="header-notifications-dropdown">
                    <Link to="/sign-in" className="ant-dropdown-link">
                        {profile_svg}
                    </Link>
                </Dropdown>
            </Col>
        </Row>
    </>);
}

export default Header;
