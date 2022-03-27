const { Outlet } = require("react-router-dom")


const Layout =()=>{
    return(
        <div className="layout">
            <Outlet/>
        </div>
    )
}

export default Layout