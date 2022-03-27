import {useState} from 'react'
import {Navigate, Outlet, useLocation,Route,useNavigate} from 'react-router-dom'
import '../Styles/App.css'

const data=[
  {id:1,placename:"Shimla"},
  {id:2,placename:"Tirumala"},
  {id:3,placename:"Ooty"}
]



const Home =()=>{
  const location=useLocation()
  const navigate=useNavigate()

  const showPlace=(place_name)=>{
    navigate(`/place/${place_name}`,{replace:true})
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
            <div className='place' id={`place${d.id}`} onClick={()=>{showPlace(d.placename)}}>
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
