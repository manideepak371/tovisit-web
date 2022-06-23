import axios from "axios"
import { Navigate } from "react-router-dom"
import { useEffect,useState,useRef } from "react"
import { Alert } from "react-bootstrap"
import '../Styles/App.css'

const URL=process.env.REACT_APP_NODE_SERVER_URL

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
        const response=await axios.get(URL+'tovisit/getplaces')
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
                if(data?.areas?.length > 0){
                    data.areas?.forEach((area) => {
                        temp1.push(area?.placename)
                    });
                }
            })
            setAreas(temp1)
        }
    }
    
    const getDetails=async ()=>{
        var selectedPlace={placename:place}
        const response=await axios.post(URL+'tovisit/getdetails',selectedPlace)
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
                // <div className="no-data-div">No Details found on this place</div>
                null
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
                        {
                            areas?.length > 0 &&
                            areas.map((area)=>(
                                <option className="select-options">{area}</option>
                            ))
                        } 
                    </select>   :
                     <div className="no-data-div"><label>No places to list</label></div>
                } 
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
        if(updatedstartmonth.length > 0 && details[0]?.startmonth !== updatedstartmonth){
            changearr.startmonth=updatedstartmonth
        }
        if(updatedendmonth.length > 0 && details[0]?.endmonth !== updatedendmonth){
            changearr.endmonth=updatedendmonth
        }
        if(updatedseason.length > 0 && details[0]?.season !== updatedseason){
            changearr.season=updatedseason
        }
        if(Object.keys(changearr).length > 0){
            changearr.placename=details[0].placename
            setUpdatedDetails(changearr)
        }
        if(Object.keys(updateddetails).length > 0 || updatedImage !== undefined){
            uploadUpdatedDetails()
        }
    }

    const uploadUpdatedDetails=async ()=>{
        var formData=new FormData()
        if(Object.keys(updateddetails).length > 0){
            if(updateddetails?.startmonth){
                formData.append('startmonth',updateddetails?.startmonth)
            }
            if(updateddetails?.endmonth){
                formData.append('endmonth',updateddetails?.endmonth)
            }
            if(updateddetails?.season){
                formData.append('season',updateddetails?.season)
            }
        }
        if(details[0].isArea){
            formData.append('parentplace',details[0].parentplace)
        }
        if(details[0].isPlace){
            formData.append('isPlace',details[0].isPlace)
        }
        if(details[0]?.placename){
            formData.append('placename',details[0]?.placename)
        }
        if(updatedImage !== undefined){
            formData.append('images',updatedImage)
            formData.append('imagekey',details[0].images[0].key)
        }
        if(Object.keys(updateddetails).length > 0 || updatedImage){
            const response=await axios.post(URL+'tovisit/admin/updatePlace',formData)
            const responseData=await response.data
            console.log(responseData)
            if(responseData.success){
                setSuccess(true)
                setSuccessMsg(responseData.message)
                setError(false)
                setErrorMsg("")
                setTimeout(()=>{
                    setReload(true)
                },3000)
            }
            if(!responseData.success){
                setSuccess(false)
                setSuccessMsg("")
                setError(true)
                setErrorMsg(responseData.message)
                setReload(false)
            }
        }
    }

    const TextAreaDisplayed=()=>{
        if(details[0].isPlace){
            let AREAS=[]
            if(details[0].areas?.length > 0){
                details[0]?.areas?.map(area =>{
                    AREAS.push(area.placename)
                    return null
                })
            }
            return(
                <p><label className="place-attributes">Areas :</label> 
                    <textarea className="place-value-text" placeholder="Areas assoicted to this place are 
                        displayed here separed by commas(,)" defaultValue={details[0]?.areas?.length > 0 ?
                            AREAS.join(', ') 
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

    return (
        <div>
            <p><label className="place-attributes">Place Name :</label> <input type="text" className="place-value-text" name="placename" defaultValue={details[0]?.placename} readOnly/></p>
            {
                details[0].isPlace &&
                <>
                    <p>
                    <label className="place-attributes">Start Month :</label> 
                    <select className="admin-dropdown" defaultValue={details[0]?.startmonth} onChange={(event)=>{setUpdatedStartmonth(event.target.value)}}>
                        <option className="select-options">Select</option>
                        {Months.map((month)=>(
                            <option className="select-options">{month.month}</option>
                        ))}
                    </select>
                    </p>
                    <p>
                        <label className="place-attributes">End Month :</label> 
                        <select className="admin-dropdown" defaultValue={details[0]?.endmonth} onChange={(event)=>{setUpdatedEndmonth(event.target.value)}}>
                            <option className="select-options">Select</option>
                            {Months.map((month)=>(
                                <option className="select-options">{month.month}</option>
                            ))}
                        </select>
                    </p>
                    <p>
                        <label className="place-attributes">Season :</label>
                        <select className="admin-dropdown" defaultValue={details[0]?.season} onChange={(event)=>{setUpdatedSeason(event.target.value)}}>
                            <option className="select-options">Select</option>
                            {Seasons.map((season)=>(
                                <option className="select-options">{season.season}</option>
                            ))}
                        </select>
                    </p>
                </>
            }   
            <p> 
                <label className="place-attributes">Is Place ?</label> <input type="radio" className="place-value-radio" name="placeORarea" checked={details[0]?.isPlace} readOnly/>
                <label className="place-attributes">Is Area ?</label> <input type="radio" className="place-value-radio" name="placeORarea" checked={details[0]?.isArea} readOnly/>
            </p>
            <TextAreaDisplayed/>
            <div className="admin-div-image-show">
                <img style={{width:"100%",marginTop:"10px"}} src="{details[0]?.images[0]?.imagelink}" alt="No image found"/>
                <p style={{textAlign:"center"}}><label className="place-attributes">Replace Image :</label> <input type="file" accept="image/*,.jpg,.png" onChange={(event)=>{UpdatedImage(event.target)}} /></p>
            </div>
            {error && <Alert variant="danger" onClose={()=>{setError(false)}} dismissible={true}>{errorMessage}</Alert>}
            {success && <Alert variant="success" onClose={()=>{setSuccess(false)}} dismissible={true}>{successMessage}</Alert>}
            <div className="admin-save-delete-btn">
                <p>
                    <button className="sign-btn" id="save-btn" onClick={()=>{ChangedDetails()}}>Save</button>
                    <button className="sign-btn" id="delete-btn" disabled>Delete Place</button>
                </p>
            </div>
            {reload && <Navigate to='/addupdate' replace={true} />}
        </div>
    )
}

export default ExistingPlaceDetails