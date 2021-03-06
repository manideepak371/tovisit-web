import React from 'react';
import ReactDOM from 'react-dom';
import '../src/Styles/index.css';
import reportWebVitals from './reportWebVitals';
import Routing from './Routing/Routing'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import '../src/Styles/App.css'
import {Navbar,Container} from 'react-bootstrap'
import axios from 'axios';
const Menubar=()=>{
  return(
      <div id='menu-nav-bar'>
          <Navbar variant='lg' className='navbar'>
              <Container>
                  <div className='nav-div'>
                    <table className='navtable'>
                        <tr>
                            <td><Link to='/'><span className="nav-links">Home</span></Link></td>
                            <td><Link to='/about'><span className="nav-links">About</span></Link></td>
                        </tr>
                    </table>
                  </div>
              </Container>
          </Navbar>        
      </div>
  )
}

axios.interceptors.request.use(
  request => {
    request.headers['Content-Type']="application/json";
    request.headers['Access-Control-Allow-Origin']="https://tovisit-india-node-server.herokuapp.com" || "http://localhost:9000"
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  }
)

ReactDOM.render(
  <React.StrictMode>
    <div className="div-home">
      <BrowserRouter>
        <div className="div-flex" id="div1"><Menubar/></div>
        <Routes>
          <Route path='/*' element={<Routing/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
