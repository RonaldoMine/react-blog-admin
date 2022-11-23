import {Popconfirm, Space} from "antd";
import {DeleteButton, EditButton} from "../../components/button/CustomButton";

export const columns = [
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
                    <EditButton onClick={() => console.log(record.id)}/>
                    <Popconfirm placement="Press 'OK' to confirm" title="Ryan Tompson">
                        <DeleteButton onClick={() => console.log(record.id)}/>
                    </Popconfirm>
                </Space>
            </div>
        )
    }
]