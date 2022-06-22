import {useState,useEffect,useMemo} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

const MatchSeasontoMonth=[
    ['Winter',1],
    ['Winter',2],
    ['Summer',3],
    ['Summer',4],
    ['Summer',5],
    ['Summer',6],
    ['Monsoon',7],
    ['Monsoon',8],
    ['Monsoon',9],
    ['Spring',10],
    ['Spring',11],
    ['Winter',12]
]

const Months=["January","February","March","April","May","June","July","August","September","October","November","December"]

const Seasons=[
    {season:"All Seasons"},
    {season:"Monsoon Rains"},
    {season:"Spring"},
    {season:"Summer"},
    {season:"Winter"}
]

const BasedOn=({selectedBtn,data})=>{

    const navigate=useNavigate()
    const placeChange=(place_name)=>{
        navigate(`place/${place_name}`,{replace:true})
    }

    if(selectedBtn === 'now')
    {
        let a=[]
        let currentMonth=Months[new Date().getMonth()]
        let currentMonthNumber=new Date().getMonth()
        let currentSeason=MatchSeasontoMonth[currentMonthNumber][0]
        data.forEach(place => {
            if(place.startmonth === Months[new Date().getMonth()] ){
                a.push(place)
            }
        });
        return(
            <>
                <hr style={{color:"red",backgroundColor:"red",marginLeft:"5%",marginRight:"5%",height:"10px"}}></hr>
                <label className='based-labels'>Based on current Month & Season - {currentMonth} / {currentSeason}</label>
                <div className='div-places'>
                    {
                        a.map((place)=>(
                            <div className='based-on-divs'><label className='home-place-div' onClick={()=>{placeChange(place.placename)}}>{place?.placename}</label></div>
                        ))
                    }
                </div>
            </>
        )
    }

    if(selectedBtn === "city"){
        let a=data
        a.sort((a,b)=>{
            return b.placename > a.placename ? -1 :1
        })
        return (
            <>
                <hr style={{color:"red",backgroundColor:"red",marginLeft:"5%",marginRight:"5%",height:"10px"}}></hr>
                <label className='based-labels'>Based on City alphabetical order</label>
                <div className='div-places'>
                    {
                        a.map((place)=>(
                            <div className='based-on-divs'><label className='home-place-div' onClick={()=>{placeChange(place.placename)}}>{place?.placename}</label></div>
                        ))
                    }
                </div>
            </>
        )
    }

    if(selectedBtn === "season")
    {

        let summer=[],spring=[],winter=[],rains=[]

        data.map((place)=>{
            if(place.season === "Summer"){
                summer.push(place)
            }
            if(place.season === "Winter"){
                winter.push(place)
            }
            if(place.season === "Monsoon Rains"){
                rains.push(place)
            }
            if(place.season === "Spring"){
                spring.push(place)
            }
            return null
        })
        
        return(
            <>
                <hr style={{color:"red",backgroundColor:"red",marginLeft:"5%",marginRight:"5%",height:"10px"}}></hr>
                <label className='based-labels'>Summer</label>
                <div className='div-places'>
                    {
                        summer.map((place)=>(
                            <div className='based-on-divs'><label className='home-place-div' onClick={()=>{placeChange(place.placename)}}>{place?.placename}</label></div>
                        ))
                    }
                </div>
                <hr style={{color:"red",backgroundColor:"red",marginLeft:"5%",marginRight:"5%",height:"10px"}}></hr>
                <label className='based-labels'>Winter</label>
                <div className='div-places'>
                    {
                        winter.map((place)=>(
                            <div className='based-on-divs'><label className='home-place-div' onClick={()=>{placeChange(place.placename)}}>{place?.placename}</label></div>
                        ))
                    }
                </div>
                <hr style={{color:"red",backgroundColor:"red",marginLeft:"5%",marginRight:"5%",height:"10px"}}></hr>
                <label className='based-labels'>Monsoon Rains</label>
                <div className='div-places'>
                    {
                        rains.map((place)=>(
                            <div className='based-on-divs'><label className='home-place-div' onClick={()=>{placeChange(place.placename)}}>{place?.placename}</label></div>
                        ))
                    }
                </div>
                <hr style={{color:"red",backgroundColor:"red",marginLeft:"5%",marginRight:"5%",height:"10px"}}></hr>
                <label className='based-labels'>Autumn / Spring</label>
                <div className='div-places'>
                    {
                        spring.map((place)=>(
                            <div className='based-on-divs'><label className='home-place-div' onClick={()=>{placeChange(place.placename)}}>{place?.placename}</label></div>
                        ))
                    }
                </div>
            </>
        )
    }

    if(selectedBtn === "month"){

        let a=[
            {mon:"January",places:[]},
            {mon:"February",places:[]},
            {mon:"March",places:[]},
            {mon:"April",places:[]},
            {mon:"June",places:[]},
            {mon:"July",places:[]},
            {mon:"August",places:[]},
            {mon:"September",places:[]},
            {mon:"October",places:[]},
            {mon:"November",places:[]},
            {mon:"December",places:[]} 
        ]

        a.forEach(month => {
            data.forEach(place => {
                if(place.startmonth === month.mon){
                    month.places.push(place)
                }
            });
        });

        console.log(a)
        return(
            <>

                {
                    a.map(month=>(
                        <>

                            {
                                month.places.length > 0 && 
                                <>  
                                    <hr style={{color:"red",backgroundColor:"red",marginLeft:"5%",marginRight:"5%",height:"10px"}}></hr>
                                    <label className='based-labels'>{month.mon}</label>
                                    {
                                        month.places.map(place => (
                                            <div className='div-places'>
                                                <div className='based-on-divs'><label className='home-place-div' onClick={()=>{placeChange(place.placename)}}>{place.placename}</label></div>
                                            </div>
                                    ))}
                                </>
                            }
                        </>
                    ))
                }
            </>   
        )
    }

}

export default BasedOn