import {Drawer, Form, Space} from "antd";
import {CancelButton, SubmitButton} from "../button/CustomButton";

function SimpleModal({title, form, open, setOpen, isLoading, onCancelForm, onConfirmForm, children}) {
    return (
        <Drawer
            title={title}
            className="settings-drawer"
            mask={true}
            onClose={() => {
                setOpen(false)
            }}
            extra={
                <Space>
                    <CancelButton key="cancel" onClick={onCancelForm}/>
                    <SubmitButton key="submit" onClick={() => form.submit()} loading={isLoading}/>
                </Space>
            }
            placement={"right"}
            open={open}
        >
            <Form layout={"vertical"} disabled={isLoading} form={form} onFinish={onConfirmForm} onAbort={onCancelForm}>
                {children}
            </Form>
        </Drawer>
    );
}

export default SimpleModal