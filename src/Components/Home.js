import {useState} from 'react'
import {Navigate, Outlet, useLocation,Route,useNavigate} from 'react-router-dom'
import '../Styles/App.css'

const data=[
  {id:1},
  {id:2},
  {id:3}
]



const Home =()=>{
  const location=useLocation()
  const navigate=useNavigate()

  const showPlace=()=>{
    navigate('/place',{replace:true})
  }

  return(
    <>
      <div className="div-grid" id="div2">
        <div className="based-on">
            <button className="based-on-buttons" >Now</button>
            <button className="based-on-buttons">City</button>
            <button className="based-on-buttons">Season</button>
            <button className="based-on-buttons">Month</button>
        </div>
      </div>
      <div className='div-grid' id="div3">
        <div className='div-places'>
          {data.map(d => (
            <div className='place' id={`place${d.id}`} onClick={()=>{showPlace()}}>
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
