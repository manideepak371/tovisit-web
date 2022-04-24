import axios from "axios"
import React, { useState, useMemo, useCallback ,useEffect, useRef} from "react"
import { Alert } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import '../Styles/App.css'

var changearr={}

const DetailsChange=(details,startmonth,endmonth,season,updatedImage)=>{
    if(startmonth.length > 0 && details[0]?.startmonth != startmonth){
        changearr.startmonth=startmonth
    }
    if(endmonth.length > 0 && details[0]?.endmonth != endmonth){
        changearr.endmonth=endmonth
    }
    if(season.length > 0 && details[0]?.season != season){
        changearr.season=season
    }
    if(Object.keys(changearr).length > 0){
        changearr.placename=details[0].placename
        return changearr
    }
    return {}
}


function Admin(){
    const navigate=useNavigate()

    const [newExisting,setNewExisting]=useState(false)
    const [newPlace,setNewPlace]=useState('new-place-hide')
    const [existingPlace,setExistingPlace]=useState('existing-place-show')
    const placeref=useRef()
    if(newExisting){
        return (
            <>
                <span className="new-existing-radio">
                    <input type="radio" name="newoldplace" value="New Place" id="new-place-radio" onChange={()=>{setNewExisting(true)}} checked={newExisting}/>
                    <label > New Place</label>
                </span>
                <span className="new-existing-radio">
                    <input type="radio" name="newoldplace" value="Existing Places" id="existing-place-radio" onChange={()=>{setNewExisting(false)}} checked={!newExisting}/>
                    <label>Existing Places</label>
                </span>
                <div className='new-place-show'>
                    <div className="admin-div">
                        <NewPlaceDetails/>
                    </div>
                </div>
            </>
        )
    }
    if(!newExisting){
        return (
            <>
                <span className="new-existing-radio">
                    <input type="radio" name="newoldplace" value="New Place" id="new-place-radio" onChange={()=>{setNewExisting(true)}} checked={newExisting}/>
                    <label > New Place</label>
                </span>
                <span className="new-existing-radio">
                    <input type="radio" name="newoldplace" value="Existing Places" id="existing-place-radio" onChange={()=>{setNewExisting(false)}} checked={!newExisting}/>
                    <label>Existing Places</label>
                </span>
                <div className={'existing-place-show'}>
                    <div className="admin-div">
                        <ExistingPlaceDetails />
                    </div>
                </div>
            </>
        )
    }
}

const DeletePlace=async (place)=>{
    const details={placename:place}
    const response=await axios.post('http://localhost:9000/admin/deletePlace',details)
    const responseData=await response.data
    console.log(responseData)
    if(responseData.success){
        return true
    }
    if(!responseData.success){
        return false
    }
}

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
        if(placename.length < 3  || startmonth == "Select" || endmonth == "Select" || season == "Select" || startmonth == "" || endmonth == "" || season == ""){
            setError(true)
            setErrMsg("Please enter required details (*)")
            return
        }
        if(imageref.current.files.length == 0 && imageref.current.value == ""){
            setError(true)
            setErrMsg("Please provide any one image related to this Place / Area")
            return
        }
        if((!isareaorplace && parentplace == "") || (!isareaorplace && parentplace == parentplace == "Select") ){
            setError(true)
            setErrMsg("Please enter the place/city name in which this area exists")
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
        formData.append('placename',details.placename)
        formData.append('startmonth',details.startmonth)
        formData.append('endmonth',details.endmonth)
        formData.append('season',details.season)
        formData.append('isArea',details.isArea)
        formData.append('isPlace',details.isPlace)
        if(details.parentplace){
            formData.append('parentplace',details.parentplace)
        }
        formData.append('images',imageref.current.files[0])
        const response=await axios.post("http://localhost:9000/admin/addPlace",formData,{headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }})
        const responseData=await response.data
        if(responseData.success){
            const imageresponse=await axios.post("http://localhost:9000/admin/uploadImage",formData,{headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }})
            const imageresponseData=await imageresponse.data
            if(imageresponseData.success){
                setSuccess(true)
                setSuccessMsg(imageresponseData.message)
                setTimeout(()=>{
                    setReload(true)
                },500)
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
        const response=await axios.get('http://localhost:9000/admin/getplaces')
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
                            {!isareaorplace &&
                                <p>
                                    <label className="place-attributes">Parent Place<label style={{color:"red"}}>*</label> :</label> 
                                    <select className="admin-dropdown" onChange={(event)=>{setParentplace(event.target.value)}}>
                                        <option className="select-options">Select</option>
                                        {places.length > 0 &&
                                            places.map((parent)=>(
                                                <option className="select-options">{parent.placename}</option>
                                            ))
                                        }
                                    </select>
                                    <p style={{color:"red",height:"10px",marginLeft:"10px"}}>If parent place /city not displayed in the drop down, then add that parent place before adding areas</p>
                                </p>
                            }
                        </span>
                    </p>
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
                    <p><label className="place-attributes">Select images to upload<label style={{color:"red"}}>*</label> :</label><input type="file" name="placeImage" ref={imageref} accept="image/*,.jpeg,.png"/></p>
                    <p>{error && <Alert variant="danger"  dismissible={true} onClose={()=>{setError(false)}}>{errorMessage}</Alert>}</p>
                    <p>{success && <Alert variant="success"  dismissible={true} onClose={()=>{setSuccess(false)}}>{successMsg}</Alert>}</p>
                    <p><button className="sign-btn" id="save-btn" onClick={()=>{CollectedDetails()}}>Save</button></p>
                    {reload && <Navigate to="/login" replace={true}/>}
                </div>
            </div>
        </>
    )
}

const ExistingPlaceDetails=()=>{
    const [places,setPlaces]=useState([])
    const [areas,setAreas]=useState([])
    const [images,setImages]=useState([{img:1}])
    const [details,setDetails]=useState([])
    const [index,setIndex]=useState(0)
    const [replacedImage,setReplacedImage]=useState()
    const [place,setPlace]=useState("")
    const placesdropdownref=useRef()
    const imageref=useRef()

    const [updatedplacename,setUpdatedPlacename]=useState("")
    const [updatedstartmonth,setUpdatedStartmonth]=useState("")
    const [updatedendmonth,setUpdatedEndmonth]=useState("")
    const [updatedseason,setUpdatedSeason]=useState("")
    const [isareaorplace,setAreaorPlace]=useState(true)
    const [updateddetails,setUpdatedDetails]=useState({})

    const imagediv=images.length > 0 ? "admin-div-image-show" : "admin-div-image-hide"
    const detailsdiv=details.length > 0 ? "admin-div-details-show" : "admin-div-details-hide"

    useEffect(()=>{
        getPlaces()
    },[])

    useEffect(()=>{
        getDetails()
    },[place])


    const getPlaces=async ()=>{
        const response=await axios.get('http://localhost:9000/admin/getplaces')
        const responseData=await response.data
        if(responseData.length > 0){
            var temp1=[]
            responseData.forEach((data)=>{
                if(data.isPlace){
                    temp1.push(data)
                }
            })
            setPlaces(temp1)
            setPlace(temp1[0].placename)
            temp1=[]
            responseData.forEach((data)=>{
                if(data.isArea){
                    temp1.push(data)
                }
            })
            setAreas(temp1)
        }
    }
    
    const getDetails=async ()=>{
        var selectedPlace={placename:place}
        const response=await axios.post('http://localhost:9000/admin/getdetails',selectedPlace)
        const responseData=await response.data
        if(responseData.length > 0){
            setDetails(responseData)
        }
    }

    const PlaceChange=()=>{
        setPlace(placesdropdownref.current.value)
    }

    const DetailsAndImages=()=>{
        if(details?.length > 0){
            return(
                <>
                    <div className={detailsdiv}>
                        {details?.length > 0 && 
                            <PlaceDetails details={details} replacedimage="hello"/>
                        }
                    </div>
                </>
            )
        }
        else{
            return(
                <div style={{marginLeft:"30%",marginTop:"20%"}}>No Details found on this place</div>
            )
        }
    }

    return(
        <>
            <div className="admin-div-dropdown">
                {places.length > 0 ? 
                    <select className="places-areas-dropdown" ref={placesdropdownref} onChange={()=>{PlaceChange()}}>
                        <option style={{backgroundColor:"antiquewhite",color:"darkgrey",width:"100%"}} disabled>Places</option>
                        {places.map((place) => (
                            <option className="select-options">{place.placename}</option>
                        ))}
                        <option style={{backgroundColor:"antiquewhite",color:"darkgrey",width:"100%"}} disabled>Areas</option>
                        {areas.map((place) => (
                            <option className="select-options">{place.placename}</option>
                        ))} 
                    </select>   : 
                    <label>No places to list</label>}
            </div>
            <>
                <DetailsAndImages/>
            </>
        </>
    )
}

const PlaceDetails=(data)=>{
    const details=data.details
    const [updatedplacename,setUpdatedPlacename]=useState("")
    const [updatedstartmonth,setUpdatedStartmonth]=useState("")
    const [updatedendmonth,setUpdatedEndmonth]=useState("")
    const [updatedseason,setUpdatedSeason]=useState("")
    const [isareaorplace,setAreaorPlace]=useState(false)
    const [updateddetails,setUpdatedDetails]=useState({})
    const [updatedImage,setImageUpdated]=useState()
    const [error,setError]=useState(false)
    const [errorMessage,setErrorMsg]=useState("")
    const [success,setSuccess]=useState(false)
    const [successMessage,setSuccessMsg]=useState("")
    const [reload,setReload]=useState(false)

    const ChangedDetails=()=>{
        var changearr={}
        if(updatedstartmonth.length > 0 && details[0]?.startmonth != updatedstartmonth){
            changearr.startmonth=updatedstartmonth
        }
        if(updatedendmonth.length > 0 && details[0]?.endmonth != updatedendmonth){
            changearr.endmonth=updatedendmonth
        }
        if(updatedseason.length > 0 && details[0]?.season != updatedseason){
            changearr.season=updatedseason
        }
        if(Object.keys(changearr).length > 0){
            changearr.placename=details[0].placename
            setUpdatedDetails(changearr)
        }
        if(Object.keys(updateddetails).length > 0){
            uploadUpdatedDetails()
        }
    }

    const uploadUpdatedDetails=async ()=>{
        var formData=new FormData()
        if(updateddetails?.startmonth){
            formData.append('startmonth',updateddetails?.startmonth)
        }
        if(updateddetails?.endmonth){
            formData.append('endmonth',updateddetails?.endmonth)
        }
        if(updateddetails?.season){
            formData.append('season',updateddetails?.season)
        }
        if(details[0].isArea){
            formData.append('parentplace',details[0].parentplace)
        }
        if(updateddetails?.placename){
            formData.append('placename',updateddetails?.placename)
        }
        if(updatedImage != undefined){
            formData.append('images',updatedImage)
            formData.append('imagekey',details[0].images[0].key)
        }
        const response=await axios.post('http://localhost:9000/admin/updatePlace',formData)
        // const responseData=await response.data
        // if(responseData.success){
        //     const imageresponse=await axios.post('http://localhost:9000/admin/uploadUpdatedImage',formData)
        //     const imageresponseData=await imageresponse.data
        //     if(imageresponseData.success){
        //         setSuccess(true)
        //         setSuccessMsg(imageresponseData.message)
        //         setError(false)
        //         setErrorMsg("")
        //         setReload(true)
        //     }
        //     if(!imageresponseData.success){
        //         setSuccess(false)
        //         setSuccessMsg("")
        //         setError(true)
        //         setErrorMsg(imageresponseData.message)
        //         setReload(false)
        //     }
        // }
        // if(!responseData.success){
        //     setSuccess(false)
        //     setSuccessMsg("")
        //     setError(true)
        //     setErrorMsg(imageresponseData.message)
        //     setReload(false)
        // }
    }

    const TextAreaDisplayed=()=>{
        if(details[0].isPlace){
            return(
                <p><label className="place-attributes">Areas :</label> 
                    <textarea className="place-value-text" placeholder="Areas assoicted to this place are 
                        displayed here separed by commas(,)" defaultValue={details[0]?.areas?.length > 0 ?
                            details[0]?.areas?.join(',') 
                        : "No areas to visit in this Place"} readOnly>
                    </textarea>
                    <label className="place-wrng-msg"><small>To remove areas associated to this Place, remove from Area Section</small></label>
                </p>
            )
        }
        if(details[0].isArea){
            return(
                <p>
                    <label className="place-attributes">Parent Place :</label>
                    <input type="text" className="place-value-text" defaultValue={details[0].parentplace} readOnly/>
                </p>
            )
        }   
    }


    const UpdatedImage=(e)=>{
        if(e.files.length > 0 && e.value != ""){
            setImageUpdated(e.files[0])
        }
    }

    const Delete=async ()=>{
        const response=await DeletePlace(details[0].placename)
        console.log(response)
        if(response){
            setReload(true)
        }
    }

    return (
        <div>
            <p><label className="place-attributes">Place Name :</label> <input type="text" className="place-value-text" name="placename" defaultValue={details[0]?.placename} readOnly/></p>
            <p><label className="place-attributes">Start Month :</label> 
                <select className="admin-dropdown" defaultValue={details[0]?.startmonth} onChange={(event)=>{setUpdatedStartmonth(event.target.value)}}>
                    <option className="select-options">Select</option>
                    {Months.map((month)=>(
                        <option className="select-options">{month.month}</option>
                    ))}
                </select>
            </p>
            <p><label className="place-attributes">End Month :</label> 
                <select className="admin-dropdown" defaultValue={details[0]?.endmonth} onChange={(event)=>{setUpdatedEndmonth(event.target.value)}}>
                    <option className="select-options">Select</option>
                    {Months.map((month)=>(
                        <option className="select-options">{month.month}</option>
                    ))}
                </select>
            </p>
            <p><label className="place-attributes">Season :</label>
                <select className="admin-dropdown" defaultValue={details[0]?.season} onChange={(event)=>{setUpdatedSeason(event.target.value)}}>
                    <option className="select-options">Select</option>
                    {Seasons.map((season)=>(
                        <option className="select-options">{season.season}</option>
                    ))}
                </select>
            </p>   
            <p> 
                <label className="place-attributes">Is Place ?</label> <input type="radio" className="place-value-radio" name="placeORarea" checked={details[0]?.isPlace} readOnly/>
                <label className="place-attributes">Is Area ?</label> <input type="radio" className="place-value-radio" name="placeORarea" checked={details[0]?.isArea} readOnly/>
            </p>
            <TextAreaDisplayed/>
            <div className="admin-div-image-show">
                <img style={{width:"100%",marginTop:"10px"}} src={details[0]?.images[0]?.imagelink} alt="No image found"/>
                <p style={{textAlign:"center"}}><label className="place-attributes">Replace Image :</label> <input type="file" accept="image/*,.jpg,.png" onChange={(event)=>{UpdatedImage(event.target)}} /></p>
            </div>
            <div className="admin-save-delete-btn">
                <p>
                    <button className="sign-btn" id="save-btn" onClick={()=>{ChangedDetails()}}>Save</button>
                    <button className="sign-btn" id="delete-btn" onClick={()=>{Delete()}}>Delete Place</button>
                </p>
            </div>
            {error && <Alert variant="danger" onClose={()=>{setError(false)}} dismissible={true}>{errorMessage}</Alert>}
            {success && <Alert variant="success" onClose={()=>{setSuccess(false)}} dismissible={true}>{successMessage}</Alert>}
            {reload && <Navigate to='/login' replace={true} />}
        </div>
    )
}

export default Admin


