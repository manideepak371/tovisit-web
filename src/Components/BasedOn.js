import {useState,useEffect,useMemo} from 'react'

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

    if(selectedBtn === 'now')
    {
        let a=[]
        let currentMonth=Months[new Date().getMonth()]
        let currentMonthNumber=new Date().getMonth()
        let currentSeason=MatchSeasontoMonth[currentMonthNumber][0]
        data.forEach(place => {
            console.log(place)
            if(place.startmonth === Months[new Date().getMonth()] ){
                a.push(place)
            }
        });
        return(
            <>
                <label className='based-labels'>Based on current Month & Season - {currentMonth} / {currentSeason}</label>
                <div className='div-places'>
                    {
                        a.map((place)=>(
                            <div className='based-on-divs'><label className='home-place-div'>{place?.placename}</label></div>
                        ))
                    }
                </div>
            </>
        )
    }
}

export default BasedOn