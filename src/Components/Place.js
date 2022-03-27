import {useState} from "react";
import {useNavigate,useParams} from 'react-router-dom'
import '../Styles/App.css'
import axios from 'axios'

function Place(){
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const placeDiv=data.length > 0 ? "div-scroll" : "div-no-scroll"
    const params=useParams()
    return (
        <div className={placeDiv}>
            <div className="place-div"></div>
            <div className="place-details">
                <p><label className="place-labels">Place Name: {params.place_name}</label></p>
                <p><label className="place-labels">Best to visit in Season: </label> </p>
                <p><label className="place-labels">Months: </label> </p>
                <div className="areas">
                    <div className="areas-div">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Place