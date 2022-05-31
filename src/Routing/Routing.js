import {Routes,Route, BrowserRouter as Router,Link, BrowserRouter} from 'react-router-dom'
import Home from '../Components/Home'
import Contact from '../Components/Contact'
import Place from '../Components/Place'
import '../Styles/App.css'
import {Navbar,Container} from 'react-bootstrap'
import AddUpdate from '../Components/AddUpdate'
import About from '../Components/About'
import Layout from '../Components/Layout'


function Routing(){
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Home/>}></Route>
                <Route path='contact' element={<Contact/>}></Route>
                <Route path='place/:place_name' element={<Place/>}></Route>
                <Route path='addupdate' element={<AddUpdate/>}/>
            </Route>
        </Routes>    
    )
}

export default Routing