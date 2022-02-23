import React from 'react'
import Basedon from './Basedon'
import {Navigate, Outlet, useLocation,Route} from 'react-router-dom'
import './App.css'

const data=[
  {id:1},
  {id:2},
  {id:3},
  {id:4}
]



const Home =()=>{
  const location=useLocation()
  const avigate=()=>{
    console.log("hello")
    return(
      <div>
        hello
        <Route path='/*' element={<Navigate to='login' state={{from:location}} replace />} />
      </div>
    )
  }

  return(
    <>
      <div className="div-flex" id="div2">
        <div className="based-on">
            <button className="based-on-buttons" onClick={()=>{avigate()}}>Now</button>
            <button className="based-on-buttons">City</button>
            <button className="based-on-buttons">Season</button>
            <button className="based-on-buttons">Month</button>
        </div>
      </div>
      <div className='div-flex' id="div3">
        <div className='div-places'>
          {data.map(d => (
            <div className='place' id={`place${d.id}`}>
              {d.id}
            </div>
          ))}
        </div>
      </div>
      <Outlet/>
    </>
  )

}

export default Home;
