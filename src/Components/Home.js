import {useState,useEffect} from 'react'
import {Navigate, Outlet, useLocation,Route,useNavigate} from 'react-router-dom'
import '../Styles/App.css'
import axios from 'axios'
import AddUpdate from './AddUpdate'
import BasedOn from './BasedOn'


const Home =()=>{
  const location=useLocation()
  const navigate=useNavigate()
  const [places,setPlaces]=useState([])
  const [data,setData]=useState([])
  const [btnSelected,setSelectedBtn]=useState('now')
  const [selectedDiv,setSelectdDiv]=useState('now')

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

  const swicthButton=(btn)=>{
    setSelectedBtn(btn)
    // basedOnHandler()
  }

  return(
    <>
      <div className="div-grid" id="div2">
        <div className='add-update'>
          <button className='add-update-btn' onClick={()=>{showAddUpdate()}}>Add/Update Place</button>
        </div>
        <div className="based-on">
            <button className="based-on-buttons" name='now' onClick={(event)=>{swicthButton(event.target.name)}}>Now</button> 
            <button className="based-on-buttons" name='city' onClick={(event)=>{swicthButton(event.target.name)}}>City</button>
            <button className="based-on-buttons" name='season' onClick={(event)=>{swicthButton(event.target.name)}}>Season</button> 
            <button className="based-on-buttons" name='month' onClick={(event)=>{swicthButton(event.target.name)}}>Month</button>
        </div>  
      </div>
      <div className='div-grid' id="div3">
        <div>
          <BasedOn selectedBtn={btnSelected} data={places}/>
          {/* {places?.length > 0  ? 
            places.map((place,index) => (
              <div className='based-on-divs' id={`place${index}`} onClick={()=>{showPlace(place.placename)}}>
                <label className='home-place-div'>{place.placename}</label>
              </div>
            ))
            :<div className='no-data-div'>No data available.</div>
          } */}
        </div>
      </div>
      <Outlet/>
    </>
  )

}


export default Home;
