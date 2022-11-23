import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import SimpleButton from "./SimpleButton";

export function AddButton({value = 'ADD', loading, onClick}) {
    return (<SimpleButton htmlType={"submit"} className={"ant-btn-primary"} onClick={onClick} loading={loading}>{<PlusCircleOutlined/>} {value} </SimpleButton>);
}

export function SubmitButton({value = 'SUBMIT', loading, onClick}) {
    return (<SimpleButton className={"ant-btn-primary"} onClick={onClick} loading={loading}> {value} </SimpleButton>);
}

export function CancelButton({value = 'CANCEL', loading, onClick}) {
    return (<SimpleButton htmlType={"reset"} onClick={onClick} loading={loading}> {value} </SimpleButton>);
}

export function EditButton({value = 'EDIT', loading, onClick}) {
    return (<SimpleButton className="darkbtn" onClick={onClick} loading={loading}>{<EditOutlined/>} {value} </SimpleButton>);
}

export function DeleteButton({value = 'DELETE', loading, onClick}) {
    return (<SimpleButton danger onClick={onClick} loading={loading}>{<DeleteOutlined/>} {value} </SimpleButton>);
}