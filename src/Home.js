import React from 'react'
import Basedon from './Basedon'
import './App.css'

const data=[
  {id:1},
  {id:2},
  {id:3},
  {id:4}
]

class Home extends React.Component{
  constructor(){
    super();
    this.state={
      places:5
    }
  }

  render(){
    return(
      <>
        <div className="div-flex" id="div2"><Basedon/></div>
        <div className='div-flex' id="div3">
          <div className='div-places'>
            {data.map(d => (
              <div className='place' id={`place${d.id}`}>
                {d.id}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

}

export default Home;
