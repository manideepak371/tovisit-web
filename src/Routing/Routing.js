import {Routes,Route, BrowserRouter as Router,Link, BrowserRouter} from 'react-router-dom'
import Home from '../Components/Home'
import Contact from '../Components/Contact'
import Login from '../Components/Login'
import Place from '../Components/Place'
import '../Styles/App.css'
import {Navbar,Container} from 'react-bootstrap'
import Admin from '../Components/Admin'
import About from '../Components/About'
import Layout from '../Components/Layout'
import AuthenticateAdmin from '../Components/AuthenticateAdmin'


function Routing(){
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Home/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='contact' element={<Contact/>}></Route>
                <Route path='place' element={<Place/>}></Route>
                <Route element={<AuthenticateAdmin/>}>
    
                </Route>
                <Route path='/admin' element={<Admin/>}/>
            </Route>
        </Routes>    
    )
}

export default Routing