import {Card, Col, Row, Table} from "antd";
import {columns} from "./postColums";
import {useState} from "react";
import {useQueries} from "../../utils/query";
import {APP_API_URL} from "../../utils/api";

function Post() {
    const [pagination, setPagination] = useState({page: 1, pageSize: 10});
    const {data: posts, isLoading} = useQueries(APP_API_URL + `api/posts?page=${pagination.page}&perPage=${pagination.pageSize}`, ['posts', pagination.page, pagination.pageSize]);
    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs={24} xl={24}>
                        <Card bordered={false} className={"criclebox tablespace mb-24"} title={"Posts"}>
                            <div className="table-responsive">
                                <Table loading={isLoading} columns={columns} pagination={{
                                    pageSize: pagination.pageSize,
                                    current: pagination.page,
                                    showSizeChanger: true,
                                    onChange: (page, pageSize) => setPagination({page: page, pageSize: pageSize})
                                }} dataSource={posts?.data.data.content} className="ant-border-space"/>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Post;