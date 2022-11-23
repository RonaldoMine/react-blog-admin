import {Button} from "antd";

function SimpleButton(props) {
    return (<Button {...props}>{props.children}</Button>);
}
export default SimpleButton;