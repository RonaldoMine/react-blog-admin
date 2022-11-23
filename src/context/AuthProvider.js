import {useState} from "react";
import AuthContext from "./AuthContext"
import {useNavigate} from "react-router-dom";
function AuthProvider({ children }){
    let [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")));
    let navigator = useNavigate();
    let signIn = (user) => {
        setUser(user)
        localStorage.setItem("auth", JSON.stringify(user))
    }
    let signOut = () => {
        setUser(null)
        localStorage.removeItem("auth")
        navigator('sign-in', { replace: true});
    };
    let value = { user, signIn, signOut};
    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export default AuthProvider;