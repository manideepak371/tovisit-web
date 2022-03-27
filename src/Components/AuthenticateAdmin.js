const { useNavigate, Outlet, Navigate } = require("react-router-dom");

function AuthenticateAdmin(){
    const navigate=useNavigate()
    console.log("authenticating admin.....")
    if(sessionStorage.length == 0 && sessionStorage.getItem("loggedIn") == null ){
        return (
            <Navigate to="login" replace="true" />
        )
    }   
    if(sessionStorage.getItem("loggedIn") && sessionStorage.length > 0)
        return (<Outlet/>)
}

export default AuthenticateAdmin