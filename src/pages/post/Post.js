import {useState} from "react";
import {useQueries} from "../../utils/query";
import {APP_API_URL} from "../../utils/api";
import {AddButton, DeleteButton, EditButton} from "../../components/button/CustomButton";
import CustomTableCard from "../../components/table/CustomTableCard";
import {Form, Input, message, Popconfirm, Space} from "antd";
import {useMutateWithInvalidateQueries} from "../../utils/mutation";
import {QuestionCircleOutlined} from "@ant-design/icons";
import DrawerForm from "../../components/modal/DrawerForm";

function Post() {
    const [pagination, setPagination] = useState({page: 1, pageSize: 10});
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openPopConfirm, setOpenPopConfirm] = useState(false);
    const [currentPost, setCurrentPost] = useState(0);
    const [titleForm, setTitleForm] = useState("Add Post");
    const [actionForm, setActionForm] = useState("add");
    const [form] = Form.useForm();
    const {
        data: posts,
        isLoading
    } = useQueries(APP_API_URL + `api/posts?page=${pagination.page}&perPage=${pagination.pageSize}`, ['posts', pagination.page, pagination.pageSize]);

    const {
        mutate: storePost,
        isLoading: postIsLoading
    } = useMutateWithInvalidateQueries(APP_API_URL + `api/posts/store`, 'post', ['posts', pagination.page, pagination.pageSize])

    const {
        mutate: updatePost,
        isLoading: updateIsLoading
    } = useMutateWithInvalidateQueries(APP_API_URL + `api/posts/update/${currentPost}`, 'put', ['posts', pagination.page, pagination.pageSize])

    const {
        mutate: deletePost,
        isLoading: postDeleteIsLoading
    } = useMutateWithInvalidateQueries(APP_API_URL + `api/posts/delete/${currentPost}`, 'delete', ['posts', pagination.page, pagination.pageSize])

    //Functions
    const handleSubmitAddForm = () => {
        form.validateFields().then((values) => {
            storePost(values);
            message.success('New post saved successfully');
            setOpenDrawer(false);
            form.resetFields();
        })
    };
    const handleSubmitEditForm = () => {
        form.validateFields().then((values) => {
            updatePost(values);
            message.success(`Post ${values.title} updated successfully`);
            setOpenDrawer(false);
            form.resetFields();
        })
    };
    const handleCancelForm = () => {
        form.resetFields();
        setOpenDrawer(false);
        setCurrentPost(0)
    };
    const handleAddPost = () => {
        setTitleForm("Add Post");
        setActionForm("add");
        form.resetFields();
        setCurrentPost(0);
        setOpenDrawer(true);
    }
    const handleEditPost = (record) => {
        setTitleForm("Edit Post");
        setActionForm("edit");
        form.setFieldValue('title', record.title)
        form.setFieldValue('content', record.content)
        setCurrentPost(record.id)
        setOpenDrawer(true);
    }
    const handleDeletePost = () => {
        deletePost();
        setOpenPopConfirm(false);
        setCurrentPost(0)
        message.success('Post deleted successfully');
    };

    //Columns Table
    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            render: (text) => <p>{text}</p>
        },
        {
            title: <span style={{textAlign: "center"}}>#</span>,
            key: "actions",
            render: (record) => (
                <div className="col-action">
                    <Space size={"small"}>
                        <EditButton onClick={() => {
                            handleEditPost(record);
                        }}/>
                        <Popconfirm open={openPopConfirm && currentPost === record.id}
                                    onCancel={() => {
                                        setOpenPopConfirm(false);
                                        setCurrentPost(0)
                                    }}
                                    icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                                    okButtonProps={{loading: postDeleteIsLoading}}
                                    okText={"Confirm"}
                                    onConfirm={handleDeletePost}
                                    title="Press to delete press the 'confirm' button ">
                            <DeleteButton onClick={() => {
                                setCurrentPost(record.id)
                                setOpenPopConfirm(true)
                            }}/>
                        </Popconfirm>
                    </Space>
                </div>
            )
        }
    ]

    return (
        <>
            <DrawerForm form={form} title={titleForm} isLoading={actionForm === 'add' ? postIsLoading : updateIsLoading}
                        open={openDrawer}
                        setOpen={setOpenDrawer}
                        onCancelForm={handleCancelForm}
                        onConfirmForm={actionForm === 'add' ? handleSubmitAddForm : handleSubmitEditForm}>
                <Form.Item name={"title"} label={"Title"} rules={[
                    {required: true, message: "Please input the title"}
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={"content"} label={"Content"} rules={[
                    {required: true, message: "Please input the content"}
                ]}>
                    <Input.TextArea/>
                </Form.Item>
            </DrawerForm>
            <CustomTableCard title={"Posts"} extraCard={<AddButton onClick={handleAddPost} key={"add"}/>}
                             columns={columns} loading={isLoading}
                             datas={posts}
                             pagination={pagination} setPagination={setPagination}/>
        </>
    );
}

export default Post;