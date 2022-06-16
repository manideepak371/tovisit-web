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
        if(params?.place_name){
            getDetails()
        }
    })

    const slideShow=(i)=>{
        switch(i){
            case 1:
                if(slide === d.length-1){
                    break
                }
                else{
                    setSlide(slide+1)
                    break
                }
            case -1:
                console.log(i)
                if(slide === 0){
                    return
                }
                else{
                    setSlide(slide-1)
                    break
                }
            default: break
        }
    }

    const getDetails=async ()=>{
        const response=await axios.get(DB_URL+'getDetails',{placename:params.place_name})
        const responseData=await response.data
        if(responseData){
            console.log(responseData)
            setData(responseData)
        }
    }

    return (
        <div className={placeDiv}>
            <div className="place-div">
                <div className='place-div-flex'>
                    <div style={{width:"100%"}}>
                        <img className='place-img' src='https://www.google.com/logos/doodles/2022/celebrating-satyendra-nath-bose-6753651837109430-l.webp' className='place-img' alt='Place Image'/>
                    </div>
                </div>
                <div className="place-div-flex">
                    <div className='place-details'>
                        <p>
                            <label className="place-label-keys">Place Name: </label>
                            <label className="place-label-values">{params.place_name}</label>
                        </p>
                        <p>
                            <label className="place-label-keys">Best to visit in Season: </label> 
                            <label className="place-label-values">{params.place_name}</label>
                        </p>
                        <p>
                            <label className="place-label-keys">Months: </label> 
                            <label className="place-label-values">{params.place_name}</label> 
                        </p>
                    </div>
                </div>
            </div>
            <div className="place-div">
                {/* <div className='areas-div'>                
                    <button className="slide-btn left" onClick={()=>{slideShow(-1)}}> Left </button>
                    {
                        d.map((area,index)=>(
                            <div className="area-div" id={`area-div-${index}`}>
                                {d[index].id}
                            </div>
                        ))
                    }
                    <button className="slide-btn right" onClick={()=>{slideShow(1)}}> Right </button>
                </div> */}
            </div>
        </div>
    )
}
    
export default Place