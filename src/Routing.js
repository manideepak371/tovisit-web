import {Routes,Route, BrowserRouter as Router,Link, BrowserRouter} from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Login from './Login'
import Place from './Place'
import './App.css'
import {Navbar,Container} from 'react-bootstrap'
import Admin from './Admin'
import About from './About'
import Layout from './Layout'


function Routing(){
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Home/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='contact' element={<Contact/>}></Route>
                <Route path='admin' element={<Admin/>}></Route>
            </Route>
        </Routes>    
    )
}

export default Routing