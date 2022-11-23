import {Card, Col, Row, Table} from "antd";

function CustomTableCard({title, extraCard, columns, loading, pagination, setPagination, datas}) {
    return (<>
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card bordered={false} className={"criclebox tablespace mb-24"} title={title} extra={extraCard}>
                        <div className="table-responsive">
                            <Table loading={loading} rowKey={"id"} columns={columns}
                                   pagination={pagination ? {
                                       pageSize: pagination?.pageSize,
                                       current: pagination?.page,
                                       showSizeChanger: true,
                                       onChange: (page, pageSize) => setPagination({page: page, pageSize: pageSize})
                                   }: false} dataSource={datas?.data.data.content}/>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </>);
}

export default CustomTableCard;