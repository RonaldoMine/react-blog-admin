import {Layout} from "antd";
import {Outlet} from "react-router-dom";

const {Content} = Layout;

function MainAuth() {
    return (<Layout>
        <Content className="content-ant">
            <Outlet/>
        </Content>
    </Layout>);

}

export default MainAuth