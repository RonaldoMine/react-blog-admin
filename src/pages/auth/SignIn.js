import Title from "antd/lib/typography/Title";
import {Button, Card, Form, Input, Layout, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {AUTH_API_URL} from "../../utils/api";
import {useMutate} from "../../utils/mutation";
import {useAuth} from "../../hooks/useAuth";

const {Content} = Layout;

function SignIn() {
    //Hooks
    const [form] = Form.useForm();
    const {mutateAsync: login, isLoading} = useMutate(AUTH_API_URL + `api/auth/login`);
    const navigate = useNavigate();
    const auth = useAuth();

    //Functions
    const handleSubmitForm = () => {
        const datas = form.getFieldsValue();
        let response = login(datas);
        response.then((r) => {
            auth.signIn(r.data.user);
            navigate("/dashboard", {replace: true});
            message.success(r.data.message);
        });
    }
    return (
        <div className="layout-default ant-layout layout-sign-up">
            <Content className="p-0">
                <Card
                    className="card-signup header-solid ant-card pt-0"
                    title={<Title>Sign In</Title>}
                    bordered="false"
                >
                    <Form
                        name="basic"
                        form={form}
                        onFinish={handleSubmitForm}
                        className="row-col"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, message: "Please input your username!"},
                            ]}
                        >
                            <Input placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true, message: "Please input your password!"
                                },
                                {
                                    min: 6, message: "Your password should have 6 or more than charactere"
                                }
                            ]}
                        >
                            <Input.Password placeholder="Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{width: "100%"}}
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                            >
                                LOGIN
                            </Button>
                        </Form.Item>
                    </Form>
                    <p className="font-semibold text-muted text-center">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="font-bold text-dark">
                            Sign Up
                        </Link>
                    </p>
                </Card>
            </Content>
        </div>
    );
}

export default SignIn;