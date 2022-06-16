import {Routes,Route, BrowserRouter as Router,Link, BrowserRouter} from 'react-router-dom'
import Home from '../Components/Home'
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
                <Route path='about' element={<About/>}></Route>
                <Route path='place/:place_name' element={<Place/>}></Route>
                <Route path='addupdate' element={<AddUpdate/>}/>
            </Route>
        </Routes>    
    )
}

export default Routing