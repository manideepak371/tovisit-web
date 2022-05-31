import {useState,useEffect} from 'react'
import {Navigate, Outlet, useLocation,Route,useNavigate} from 'react-router-dom'
import '../Styles/App.css'
import axios from 'axios'
import AddUpdate from './AddUpdate'

const Home =()=>{
  const location=useLocation()
  const navigate=useNavigate()
  const [places,setPlaces]=useState([])

  const showPlace=(place_name)=>{
    navigate(`/place/${place_name}`,{replace:true})
  }

  const GetPlaces=async ()=>{
    const response=await axios.get("http://localhost:9000/")
    const responseData=await response.data
    setPlaces(responseData.data)
  }
  useEffect(()=>{
    GetPlaces()
  },[])

  const showAddUpdate=()=>{
    navigate('addupdate',{replace:true})
  }

  return(
    <>
      <div className="div-grid" id="div2">
        <p><div className='add-update'>
            <button className='add-update-btn' onClick={()=>{showAddUpdate()}}>Add/Update Place</button>
          </div>
        </p>
        <div className="based-on">
            <button className="based-on-buttons" >Now</button>
            <button className="based-on-buttons">City</button>
            <button className="based-on-buttons">Season</button>
            <button className="based-on-buttons">Month</button>
        </div>
      </div>
      <div className='div-grid' id="div3">
        <div className='div-places'>
          {places?.length > 0  ? 
            places.map((place,index) => (
              <div className='place' id={`place${index}`} onClick={()=>{showPlace(place.placename)}}>
                {place.placename}
              </div>
            ))
            :<div className='no-data-div'>No data available.</div>
          }
        </div>
      </div>
      <Outlet/>
    </>
  )

}

export default Home;
