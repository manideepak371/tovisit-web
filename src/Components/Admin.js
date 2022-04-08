import axios from "axios"
import React, { useState, useMemo, useCallback ,useEffect, useRef} from "react"
import { Alert } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import '../Styles/App.css'

var changearr={}

const DetailsChange=(details,placename,startmonth,endmonth,season,isareaorplace)=>{
    console.log(isareaorplace)
    if(placename.length > 0 && details[0]?.placename != placename){
        changearr.placename=placename
    }
    if(startmonth.length > 0 && details[0]?.startmonth != startmonth){
        changearr.startmonth=startmonth
    }
    if(endmonth.length > 0 && details[0]?.endmonth != endmonth){
        changearr.endmonth=endmonth
    }
    if(season.length > 0 && details[0]?.season != season){
        changearr.season=season
    }
    if(isareaorplace){
        changearr.isPlace=true
        changearr.isArea=false
    }
    if(!isareaorplace){
        changearr.isArea=true
        changearr.isPlace=false
    }
    if(Object.keys(changearr).length > 0){
        return changearr
    }
    return {}
}


function Admin(){
    const navigate=useNavigate()

    const [newExisting,setNewExisting]=useState(false)
    const placeref=useRef()

    const newPlace= newExisting ? 'new-place-show' : 'new-place-hide'
    const existingPlace= !newExisting ? 'existing-place-show' : 'existing-place-hide'

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
            <div className={existingPlace}>
                <div className="admin-div">
                    <ExistingPlaceDetails />
                </div>
            </div>
            <div className={newPlace}>
                <div className="admin-div">
                    <NewPlaceDetails/>
                </div>
            </div>
        </>
    )
}

const DeletePlace=(place)=>{
    console.log(place)
}

const NewPlaceDetails=()=>{
    const [placename,setPlacename]=useState("")
    const [startmonth,setStartmonth]=useState("")
    const [endmonth,setEndmonth]=useState("")
    const [season,setSeason]=useState("")
    const [isareaorplace,setAreaorPlace]=useState(true)
    const [details,setDetails]=useState({})
    const [errorMessage,setErrMsg]=useState("")
    const [error,setError]=useState(false)
    const imageref=useRef({})
    const isplaceref=useRef()
    const isarearef=useRef()

    const CollectedDetails=()=>{
        if(placename.length < 3  || startmonth == "Select" || endmonth == "Select" || season == "Select" || startmonth == "" || endmonth == "" || season == ""){
            setError(true)
            setErrMsg("Please enter required details (*)")
        } 
        else{
            if(imageref.current.files.length == 0 && imageref.current.value == ""){
                setError(true)
                setErrMsg("Please provide alteaset one image related to this Place / Area")
            }
            else{
                setError(false)
                setErrMsg("")
                setDetails({placename,startmonth,endmonth,season,isPlace:isareaorplace,isArea:!isareaorplace})
            }
        }
    }

    return(
        <>
            <div className="admin-div-new-place-details">
                <div>
                    <p><label className="place-attributes">Name<label style={{color:"red"}}>*</label> :</label> <input type="text" placeholder="Enter Place/Area name" className="place-value-text" onChange={(event)=>{setPlacename(event.target.value)}}/></p>
                    <p><label className="place-attributes">Start Month<label style={{color:"red"}}>*</label> :</label> 
                        <select className="admin-dropdown" onChange={(event)=>{setStartmonth(event.target.value)}}>
                            <option>Select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                    </p>
                    <p><label className="place-attributes">End Month<label style={{color:"red"}}>*</label> :</label> 
                        <select className="admin-dropdown" onChange={(event)=>{setEndmonth(event.target.value)}}>
                            <option>Select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>    
                    </p>
                    <p><label className="place-attributes">Season<label style={{color:"red"}}>*</label> :</label>
                        <select className="admin-dropdown" onChange={(event)=>{setSeason(event.target.value)}}>
                            <option>Select</option>
                            <option>Monsoon Rains</option>
                            <option>Summer</option>
                            <option>Spring</option>
                            <option>Winter</option>
                        </select>
                    </p>   
                    <p> 
                        <label className="place-attributes">Is Place ?</label> <input type="radio" ref={isplaceref} className="place-value-radio" name="placeORarea" defaultChecked={isareaorplace} onChange={(event)=>{setAreaorPlace(true)}}/>
                        <label className="place-attributes">Is Area ?</label> <input type="radio" ref={isarearef} className="place-value-radio" name="placeORarea" defaultChecked={!isareaorplace} onChange={(event)=>{setAreaorPlace(false)}}/>
                    </p>
                    <p><label className="place-attributes">Areas :</label> <textarea className="place-value-text" placeholder="Enter area names separate by comma(,)"/>
                    </p>
                    <p><label className="place-attributes">Select images to upload<label style={{color:"red"}}>*</label> :</label><input type="file" ref={imageref} accept="image/*,.jpeg,.png" multiple={true}/></p>
                    <p>{error && <Alert variant="danger"  dismissible={true} onClose={()=>{setError(false)}}>{errorMessage}</Alert>}</p>
                    <p><button className="sign-btn" id="save-btn" onClick={()=>{CollectedDetails()}}>Save</button></p>
                </div>
            </div>
        </>
    )
}


const ExistingPlaceDetails=()=>{
    const [places,setPlaces]=useState([])
    const [images,setImages]=useState([{img:1}])
    const [details,setDetails]=useState([])
    const [place,setPlace]=useState("")
    const placesdropdownref=useRef()

    const [updatedplacename,setUpdatedPlacename]=useState("")
    const [updatedstartmonth,setUpdatedStartmonth]=useState("")
    const [updatedendmonth,setUpdatedEndmonth]=useState("")
    const [updatedseason,setUpdatedSeason]=useState("")
    const [isareaorplace,setAreaorPlace]=useState(true)
    const [updateddetails,setUpdatedDetails]=useState({})

    useEffect(()=>{
        getPlaces()
    },[])

    useEffect(()=>{
        getDetails()
    },[place])
    
    const imagediv=images.length > 0 ? "admin-div-image-show" : "admin-div-image-hide"
    const detailsdiv=details.length > 0 ? "admin-div-details-show" : "admin-div-details-hide"

    const getPlaces=async ()=>{
        const response=await axios.get('http://localhost:9000/places/getplaces')
        const responseData=await response.data
        if(responseData.length > 0){
            setPlaces(responseData)
            setPlace(responseData[0].placename)
        }
    }
    
    
    const getImages=async (selectedPlace)=>{
        const response=await axios.post('http://localhost:9000/admin/images',selectedPlace)
        const responseData=await response.data
    }
    
    const getDetails=async ()=>{
        var selectedPlace={place:place}
        const response=await axios.post('http://localhost:9000/places/getdetails',selectedPlace)
        const responseData=await response.data
        if(responseData.length > 0){
            setDetails(responseData)
        }
    }

    const PlaceChange=()=>{
        setPlace(placesdropdownref.current.value)
    }

    const ChangedDetails=()=>{
        const newDetails=DetailsChange(details,updatedplacename,updatedstartmonth,updatedendmonth,updatedseason,isareaorplace)
        setUpdatedDetails(newDetails)
    }

    return(
        <>
            <div className="admin-div-dropdown">
                {places.length > 0 ? <select className="admin-dropdown" ref={placesdropdownref} onChange={()=>{PlaceChange()}}>
                    {places.map((place) => (
                        <option>{place.placename}</option>
                    ))}
                </select> : <label>No places to list</label>}
            </div>
            <div className={imagediv}>
                sfdfdasdlaksdmlkaflkd
            </div>
            <div className={detailsdiv}>
                <div>
                    <p><label className="place-attributes">Place Name :</label> <input type="text" className="place-value-text" name="placename" defaultValue={details[0]?.placename} onChange={(event)=>{setUpdatedPlacename(event.target.value)}}/></p>
                    <p><label className="place-attributes">Start Month :</label> 
                        <select className="admin-dropdown" defaultValue={details[0]?.startmonth} onChange={(event)=>{setUpdatedStartmonth(event.target.value)}}>
                            <option>Select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                    </p>
                    <p><label className="place-attributes">End Month :</label> 
                        <select className="admin-dropdown" defaultValue={details[0]?.endmonth} onChange={(event)=>{setUpdatedEndmonth(event.target.value)}}>
                            <option>Select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                    </p>
                    <p><label className="place-attributes">Season :</label>
                        <select className="admin-dropdown" defaultValue={details[0]?.season} onChange={(event)=>{setUpdatedSeason(event.target.value)}}>
                            <option>Select</option>
                            <option>Monsoon Rains</option>
                            <option>Summer</option>
                            <option>Spring</option>
                            <option>Winter</option>
                        </select>
                    </p>   
                    <p> 
                        <label className="place-attributes">Is Place ?</label> <input type="radio" className="place-value-radio" name="placeORarea" checked={details[0]?.isPlace}/>
                        <label className="place-attributes">Is Area ?</label> <input type="radio" className="place-value-radio" name="placeORarea" checked={details[0]?.isArea}/>
                    </p>
                    <p><label className="place-attributes">Areas :</label> <textarea className="place-value-text" placeholder="Areas assoicted to this place are 
                    displayed here separed by commas(,)" defaultValue={details[0]?.areas?.length > 0 ?
                        details[0]?.areas?.join(',') 
                        : "No areas to visit in this Place"}>
                    </textarea>
                            <label className="place-wrng-msg"><small>To remove areas associated to this Place, remove from Area Section</small></label>
                    </p>
                    <p>
                        <button className="sign-btn" id="save-btn" onClick={()=>{ChangedDetails()}}>Save</button>
                        <button className="sign-btn" id="delete-btn" >Delete Place</button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Admin


