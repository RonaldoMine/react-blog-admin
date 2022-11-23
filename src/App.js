import {Route, Routes} from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import MainAuth from "./components/layout/MainAuth";
import {QueryClient, QueryClientProvider} from "react-query";
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import ManageRoute from "./components/ManageRoute";
import Main from "./components/layout/Main";
import Post from "./pages/post/Post";

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes>
                    <Route element={<MainAuth/>}>
                        <Route path={"sign-up"} element={<SignUp/>}/>
                        <Route path={"sign-in"} element={<SignIn/>}/>
                    </Route>
                    <Route element={<RequireAuth/>}>
                         <Route element={<Main/>}>
                            <Route path={"dashboard"} element={<Dashboard/>}/>
                            <Route path={"posts"} element={<Post/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<ManageRoute/>}/>
                </Routes>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
