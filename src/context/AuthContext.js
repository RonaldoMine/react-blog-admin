import {createContext} from "react";
const AuthContext = createContext({
    user: null,
    signIn: (function (any) {}),
    signOut: (function (){}),
});
export default  AuthContext;