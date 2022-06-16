import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import '../Styles/App.css'


const DB_URL=process.env.REACT_APP_DB_URL

const Months=[
    {month:"January"},
    {month:"Feb"},
    {month:"March"},
    {month:"April"},
    {month:"May"},
    {month:"June"},
    {month:"July"},
    {month:"August"},
    {month:"September"},
    {month:"October"},
    {month:"November"},
    {month:"December"},
]

const Seasons=[
    {season:"All Seasons"},
    {season:"Monsoon Rains"},
    {season:"Spring"},
    {season:"Summer"},
    {season:"Winter"}
]

const NewPlaceDetails=()=>{
    const [placename,setPlacename]=useState("")
    const [parentplace,setParentplace]=useState("")
    const [startmonth,setStartmonth]=useState("")
    const [endmonth,setEndmonth]=useState("")
    const [season,setSeason]=useState("")
    const [isareaorplace,setAreaorPlace]=useState(true)
    const [places,setPlaces] = useState([])
    const [details,setDetails]=useState({})
    const [errorMessage,setErrMsg]=useState("")
    const [error,setError]=useState(false)
    const imageref=useRef({})
    const isplaceref=useRef()
    const isarearef=useRef()
    const [success,setSuccess]=useState(false)
    const [successMsg,setSuccessMsg]=useState("")
    const [reload,setReload] = useState(false)

    const CollectedDetails=()=>{
        if(placename.length < 3  || (isareaorplace && startmonth === "Select") || (isareaorplace && endmonth === "Select") || (isareaorplace && season === "Select") || (isareaorplace && startmonth === "") || (isareaorplace && endmonth === "") || (isareaorplace && season === "")){
            setError(true)
            setErrMsg("Please enter required details (*)")
            return
        }
        if((!isareaorplace && parentplace === "") || (!isareaorplace && parentplace === "Select") ){
            setError(true)
            setErrMsg("Please enter the place/city name in which this area exists")
            return
        }
        if(imageref.current.files.length === 0 && imageref.current.value === ""){
            setError(true)
            setErrMsg("Please provide any one image related to this Place / Area")
            return
        } 
        else{
            setError(false)
            setErrMsg("")
            var detailsObj={
                placename,startmonth,endmonth,season,isPlace:isareaorplace,isArea:!isareaorplace
            }
            if(!isareaorplace){
                detailsObj.parentplace=parentplace
            }
            setDetails(detailsObj)
        }
        
        if(Object.keys(details).length > 0){
            uploadNewPlace()
        }
    }

    const uploadNewPlace=async()=>{
        var formData=new FormData()
        if(details.isPlace){
            formData.append('placename',details.placename)
            formData.append('startmonth',details.startmonth)
            formData.append('endmonth',details.endmonth)
            formData.append('season',details.season)
            formData.append('isArea',details.isArea)
            formData.append('isPlace',details.isPlace)
        }
        if(details.isArea){
            formData.append('placename',details.placename)
            formData.append('isArea',details.isArea)
            formData.append('isPlace',details.isPlace)
            formData.append('parentplace',details.parentplace)
        }
        formData.append('images',imageref.current.files[0])
        const response=await axios.post(DB_URL+"admin/addPlace",formData,{headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }})
        const responseData=await response.data
        if(responseData.success){   
            const imageresponse=await axios.post(DB_URL+"admin/uploadImage",formData,{headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }})
            const imageresponseData=await imageresponse.data
            if(imageresponseData.success){
                setSuccess(true)
                setSuccessMsg(imageresponseData.message)
                console.log(responseData.message)
                console.log(imageresponseData.message)
                console.log(responseData)
                console.log(imageresponseData)
                setTimeout(()=>{
                    setReload(true)
                },1000)
            }
            if(!imageresponseData.success){
                setSuccess(false)
                setError(true)
                setSuccessMsg("")
                setErrMsg(imageresponseData.message)
                return                                
            }
        }
        if(!responseData.success){
            setSuccess(false)
            setError(true)
            setSuccessMsg("")
            setErrMsg(responseData.message)
            return
        }
    }

    const getPlaces=async ()=>{
        const response=await axios.get(DB_URL+'getplaces')
        const responseData=await response.data
        if(responseData.length > 0){
            var temp=[]
            responseData.forEach((data)=>{
                if(data.isPlace){
                    temp.push(data)
                }
            })
            setPlaces(temp)
        }
    }

    useEffect(()=>{ 
        getPlaces()
    },[])
    
    return(
        <>
            <div className="admin-div-new-place-details">
                <div>
                    <p>
                        <span><label className="place-attributes">Name<label style={{color:"red"}}>*</label> :</label> 
                            <input type="text" placeholder="Enter Place/Area name" className="place-value-text" defaultValue={placename} onChange={(event)=>{setPlacename(event.target.value)}}/>
                        </span>
                    </p>
                    <p>
                        <span> 
                            <label className="place-attributes">Is Place ?</label> <input type="radio" ref={isplaceref} className="place-value-radio" name="placeORarea" defaultChecked={isareaorplace} onChange={(event)=>{setAreaorPlace(true)}}/>
                            <label className="place-attributes">Is Area ?</label> <input type="radio" ref={isarearef} className="place-value-radio" name="placeORarea" defaultChecked={!isareaorplace} onChange={(event)=>{setAreaorPlace(false)}}/>
                        </span>
                    </p>
                    {!isareaorplace ?
                        <>
                            <p>
                                <span>
                                    <label className="place-attributes">Parent Place<label style={{color:"red"}}>*</label> :</label> 
                                    <select className="admin-dropdown" onChange={(event)=>{setParentplace(event.target.value)}}>
                                        <option className="select-options">Select</option>
                                        {places.length > 0 &&
                                            places.map((parent)=>(
                                                <option className="select-options">{parent.placename}</option>
                                            ))
                                        }
                                    </select>
                                </span>
                                <p style={{color:"red",height:"10px",marginLeft:"10px"}}>If parent place /city not displayed in the drop down, then add that parent place before adding areas</p>
                            </p>
                        </> :
                        <>
                            <p>
                                <span><label className="place-attributes">Start Month<label style={{color:"red"}}>*</label> :</label> 
                                    <select className="admin-dropdown" onChange={(event)=>{setStartmonth(event.target.value)}}>
                                        <option className="select-options">Select</option>
                                        {Months.map((m)=>(
                                            <option className="select-options">{m.month}</option>
                                        ))}
                                    </select>
                                </span>
                            </p>
                            <p>
                                <span><label className="place-attributes">End Month<label style={{color:"red"}}>*</label> :</label> 
                                    <select className="admin-dropdown" onChange={(event)=>{setEndmonth(event.target.value)}}>
                                        <option className="select-options">Select</option>
                                        {Months.map((m)=>(
                                            <option className="select-options">{m.month}</option>
                                        ))}
                                    </select>    
                                </span>
                            </p>
                            <p>
                                <span><label className="place-attributes">Season<label style={{color:"red"}}>*</label> :</label>
                                    <select className="admin-dropdown" onChange={(event)=>{setSeason(event.target.value)}}>
                                        <option className="select-options">Select</option>
                                        {Seasons.map((s)=>(
                                            <option className="select-options">{s.season}</option>
                                        ))}
                                    </select>
                                </span> 
                            </p>
                        </>
                    }
                    <p><label className="place-attributes">Select images to upload<label style={{color:"red"}}>*</label> :</label><input type="file" name="placeImage" ref={imageref} accept="image/*,.jpeg,.png"/></p>
                    <p>{error && <Alert variant="danger"  dismissible={true} onClose={()=>{setError(false)}}>{errorMessage}</Alert>}</p>
                    <p>{success && <Alert variant="success"  dismissible={true} onClose={()=>{setSuccess(false)}}>{successMsg}</Alert>}</p>
                    <div className='new-place-save-btn'>
                        <p><button className="sign-btn" id="save-btn" onClick={()=>{CollectedDetails()}}>Save</button></p>
                    </div>
                    {reload && <Navigate to="/" replace={true}/>}
                </div>
            </div>
        </>
    )
}

export default NewPlaceDetails
