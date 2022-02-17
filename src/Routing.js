import {Routes,Route, BrowserRouter as Router,Link} from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Login from './Login'
import Place from './Place'
import './App.css'


const AppRoute=()=>{
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/place' element={<Place/>}></Route>
        </Routes>
    )
}

const Menubar=()=>{
    return(
        <div id='menu-nav-bar'>
            <table className='navtable'>
                <tr>
                    <td><Link to='/'><span className="nav-links">Home</span></Link></td>
                    <td><Link to='/contact'><span className="nav-links">Contact</span></Link></td>
                    <td><Link to='/login'><span className="nav-links">Login</span></Link></td>
                </tr>
            </table>        
        </div>
    )
}

function Routing(){
    return(
        <div className='div-home'>
            <Router>
                <div className="div-flex" id="div1"><Menubar/></div>
                <AppRoute/>
            </Router>
        </div>
    )
}

export default Routing