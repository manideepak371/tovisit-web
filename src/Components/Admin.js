import axios from "axios"
import { useState, useMemo, useCallback } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import '../Styles/App.css'
function Admin(){
    const navigate=useNavigate()
    const [places,setPlaces]=useState([])
    const [images,setImages]=useState([{img:1}])
    const [details,setDetails]=useState([{areas:[],name:"",start:"",end:"",season:""}])
    const [place,setPlace]=useState()
    const [newExisting,setNewExisting]=useState(false)

    const imagediv=images.length > 0 ? "admin-div-image-show" : "admin-div-image-hide"
    const detailsdiv=details.length > 0 ? "admin-div-details-show" : "admin-div-details-hide"

    const getPlaces=async ()=>{
        const response=await axios.get('http://localhost:9000/admin/places')
        const responseData=await response.data
        responseData.length > 0 ? setPlaces(responseData) : setPlaces([])
    }

    const getImages=async ()=>{
        var selectedPlace={place:place}
        const response=await axios.post('http://localhost:9000/admin/images',selectedPlace)
        const responseData=await response.data
        responseData.length > 0 ? setImages(responseData) : setImages([])
    }

    const getDetails=async ()=>{
        var selectedPlace={place:place}
        const response=await axios.post('http://localhost:9000/admin/details',selectedPlace)
        const responseData=await response.data
        responseData.length > 0 ? setDetails(responseData) : setDetails([])
    }

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
                    <div className="admin-div-dropdown">
                        {places.length > 0 ? <select className="places-dropdown" onChange={(event)=>{setPlace(event.target.value)}}>
                            {places?.map(d => (
                                <option>{d}</option>
                            ))}
                        </select> : <label>No places to list</label>}
                    </div>
                    <div className={imagediv}>
                        sfdfdasdlaksdmlkaflkd
                    </div>
                    <div className={detailsdiv}>
                        <p><label className="place-attributes">Place Name :</label> <input type="text" className="place-value-text"/></p>
                        <p><label className="place-attributes">Start Month :</label> <input type="text" className="place-value-text"/></p>
                        <p><label className="place-attributes">End Month :</label> <input type="text" className="place-value-text"/></p>
                        <p><label className="place-attributes">Season :</label> <input type="text" className="place-value-text"/></p>   
                        <p> 
                            <label className="place-attributes">Is Place ?</label> <input type="radio" className="place-value-radio" name="placeORarea"/>
                            <label className="place-attributes">Is Area ?</label> <input type="radio" className="place-value-radio" name="placeORarea"/>
                        </p>
                        <p><label className="place-attributes">Areas :</label> <textarea className="place-value-text"/>
                                <label className="place-wrng-msg"><small>To remove areas associated to this Place, remove from Area Section</small></label>
                        </p>
                    </div>
                </div>
            </div>
            <div className={newPlace}>
                <div className="admin-div">
                    <div className="admin-div-new-place-details">
                        <p><label className="place-attributes">Name :</label> <input type="text" className="place-value-text"/></p>
                        <p><label className="place-attributes">Start Month :</label> <input type="text" className="place-value-text"/></p>
                        <p><label className="place-attributes">End Month :</label> <input type="text" className="place-value-text"/></p>
                        <p><label className="place-attributes">Season :</label> <input type="text" className="place-value-text"/></p>   
                        <p> 
                            <label className="place-attributes">Is Place ?</label> <input type="radio" className="place-value-radio" name="placeORarea"/>
                            <label className="place-attributes">Is Area ?</label> <input type="radio" className="place-value-radio" name="placeORarea"/>
                        </p>
                        <p><label className="place-attributes">Areas :</label> <textarea className="place-value-text" placeholder="Enter area names separate by comma(,)"/>
                        </p>
                    </div>
                    <div className="admin-div-new-place-image">
                        sfdfdasdlaksdmlkaflkd
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin