import {createContext} from "react";
const AuthContext = createContext({
    user: null,
    signin: (function (any) {}),
    signout: (function (){}),
});
export default  AuthContext;