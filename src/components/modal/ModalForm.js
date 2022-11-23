import {Form, Modal} from "antd";
import {CancelButton, SubmitButton} from "../button/CustomButton";


function ModalForm({title, form, modalIsOpen, isLoading, onCancelForm, onConfirmForm, children}) {
    return (
        <Modal title={title}
               open={modalIsOpen} footer={[
            <CancelButton key="cancel" onClick={onCancelForm}/>,
            <SubmitButton key="submit" loading={isLoading} onClick={() => form.submit()}/>,
        ]}>
            <Form disabled={isLoading} form={form} onFinish={onConfirmForm} onAbort={onCancelForm}>
                {children}
            </Form>
        </Modal>
    );
}

export default ModalForm