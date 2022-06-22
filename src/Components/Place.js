import {useState,useEffect} from "react";
import {useNavigate,useParams} from 'react-router-dom'
import '../Styles/App.css'
import axios from 'axios'
import Carousel from 'react-multi-carousel'

const DB_URL=process.env.REACT_APP_DB_URL


function Place(){
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const placeDiv=data.length > 0 ? "div-scroll" : "div-no-scroll"
    const params=useParams()
    const [placeDetails,setDetails]=useState({})
    const [slide,setSlide]=useState(0)
    const place_name=params?.place_name.replace('%20',' ')
    const d=[
        {id:0},
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6},
        {id:7},
        {id:8},
        {id:9}    
    ]

    useEffect(()=>{
        if(place_name){
            getDetails()
        }
    },[])


    const getDetails=async ()=>{
        const response=await axios.post(DB_URL+'getdetails',{placename:place_name})
        const responseData=await response.data
        if(responseData){
            setData(responseData)
            console.log(responseData)
        }
    }

    const showPlace=(place_name)=>{
        navigate(`/place/${place_name}`,{replace:true})
        return
    }

    return (
        <div className={placeDiv}>
            <div className="place-div">
                <div className="place-div-flex">
                    {
                        data?.length > 0 &&
                        <div className='place-details'>
                            <p>
                                <label className="place-label-keys">Place Name: </label>
                                <label className="place-label-values">{data[0].placename}</label>
                            </p>
                            <p>
                                <label className="place-label-keys">Best Season to visit in: </label> 
                                <label className="place-label-values">{data[0].season}</label>
                            </p>
                            <p>
                                <label className="place-label-keys">Best Months: </label> 
                                <label className="place-label-values">{data[0].startmonth} - {data[0].endmonth}</label> 
                            </p>
                        </div>
                    }
                </div>
                <div className='place-div-flex'>
                    <div className="image-styles">
                        <img className='place-img' style={{width:"100%",height:"500px",borderRadius:"25PX"}} src={data[0]?.images[0]?.imagelink} className='place-img' alt='Place Image'/>
                    </div>
                </div>
            </div>
            <div className="div-grid">
                {
                    data[0]?.areas?.length > 0 ?
                    <>
                        <label className='place-label-keys'>Areas to visit in this place:</label>
                        <div className='div-places'>
                            {
                                data[0].areas.map((area)=>(
                                    <div className='based-on-divs'><label className='home-place-div' onClick={()=>{}}>{area.placename}</label></div>
                                ))
                            }
                        </div>
                    </> :
                      <label className='based-labels-no-data'>No areas available on this place</label>
                }
            </div>
        </div>
    )
}
    
export default Place