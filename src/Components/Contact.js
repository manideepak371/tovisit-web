import {useRef} from 'react'
 
function Contact(){
    const imageref=useRef({})

    const ImageHandler=()=>{
        console.log(imageref.current.files)
    }
    return(
        <div>
            <input type="file" ref={imageref} placeholder="select images to upload" accept="image/*,.jpeg,.png" multiple={true}/>
            <button onClick={()=>{ImageHandler()}}>Upload</button>
        </div>
    )
}

export default Contact