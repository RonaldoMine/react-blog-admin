import Title from "antd/lib/typography/Title";
import {Button, Card, Form, Input, Layout, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useMutate} from "../../utils/mutation";
import {AUTH_API_URL} from "../../utils/api";

const {Content} = Layout;

function SignUp() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const {mutateAsync: signUp, isLoading} = useMutate(AUTH_API_URL + `api/auth/sign-up`);

    //Functions
    const handleSubmitForm = () => {
        const datas = form.getFieldsValue();
        const response = signUp(datas);
        response.then((r) => {
            navigate("/sign-in", {replace: true});
            message.success(r.data.message);
        });
    }
    return (
        <div className="layout-default ant-layout layout-sign-up">
            <Content className="p-0">
                <Card
                    className="card-signup header-solid ant-card pt-0"
                    title={<Title className={"text-center"}>Sign Up</Title>}
                    bordered="false"
                >
                    <Form
                        name="basic"
                        form={form}
                        onFinish={handleSubmitForm}
                        disabled={isLoading}
                        className="row-col"
                    >
                        <Form.Item
                            name="first_name"
                            rules={[
                                {required: true, message: "Please input your first_name!"},
                            ]}
                        >
                            <Input placeholder="First Name"/>
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            rules={[
                                {required: true, message: "Please input your last name!"},
                            ]}
                        >
                            <Input placeholder="Last Name"/>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {pattern: new RegExp(/^\+?\d+$/), message: "Please enter a correct phone number"}
                            ]}
                        >
                            <Input placeholder="Phone Number"/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, message: "Please input your username!"},
                            ]}
                        >
                            <Input placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {required: true, message: "Please input an correct email!", type: "email"},
                            ]}
                        >
                            <Input placeholder="email"/>
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
                            >
                                SIGN UP
                            </Button>
                        </Form.Item>
                    </Form>
                    <p className="font-semibold text-muted text-center">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="font-bold text-dark">
                            Sign In
                        </Link>
                    </p>
                </Card>
            </Content>
        </div>
    );
}

export default SignUp;