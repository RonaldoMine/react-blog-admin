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
    }
]