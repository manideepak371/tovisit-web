import axios from "axios"
import React, { useState, useMemo, useCallback ,useEffect, useRef} from "react"
import { Alert } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import '../Styles/App.css'
import ExistingPlaceDetails from "./ExistingPlace"
import NewPlaceDetails from "./NewPlace"


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
                        <ExistingPlaceDetails/>
                    </div>
                </div>
            </>
        )
    }
}

export default Admin


